import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const supabase = createAdminClient();

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    const ids = items.map((i: any) => i.productId);
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .in("id", ids);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    let total = 0;
    const lineItems = [];

    for (const item of items) {
      const product = products?.find((p) => p.id === item.productId);
      if (!product || !product.is_active) {
        return NextResponse.json({ error: "Invalid item" }, { status: 400 });
      }
      if (product.stock_qty < item.qty) {
        return NextResponse.json(
          { error: `Not enough stock for ${product.name}` },
          { status: 400 }
        );
      }

      total += product.price_cents * item.qty;
      lineItems.push({
        quantity: item.qty,
        price_data: {
          currency: "zar",
          unit_amount: product.price_cents,
          product_data: {
            name: product.name,
            images: product.image_url ? [product.image_url] : [],
          },
        },
      });
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        status: "pending",
        total_cents: total,
      })
      .select("*")
      .single();

    if (orderError) {
      return NextResponse.json({ error: orderError.message }, { status: 400 });
    }

    const orderItems = items.map((i: any) => {
      const product = products!.find((p) => p.id === i.productId);
      return {
        order_id: order.id,
        product_id: i.productId,
        qty: i.qty,
        price_cents: product!.price_cents,
      };
    });

    await supabase.from("order_items").insert(orderItems);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      metadata: {
        orderId: order.id,
      },
    });

    await supabase
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
