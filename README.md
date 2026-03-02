<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=240&section=header&text=MyStore&fontSize=96&fontColor=ffffff&fontAlignY=42&desc=Full-Stack%20E-Commerce%20Platform&descAlignY=64&descColor=ffffffaa&animation=fadeIn" width="100%" />

<br/>

<!-- Animated typing SVG -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=6C63FF&center=true&vCenter=true&width=600&lines=Shopping+Cart+%2B+Real-Time+Stock+%F0%9F%9B%92;Stripe+Checkout+%2B+Webhooks+%F0%9F%92%B3;Admin+Dashboard+%2B+Auth+%F0%9F%91%91;Built+with+Next.js+16+%2B+Supabase+%E2%9A%A1" alt="Typing SVG" />

<br/><br/>

<a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /></a>
<a href="https://typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /></a>
<a href="https://supabase.com"><img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" /></a>
<a href="https://stripe.com"><img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" /></a>
<a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge" /></a>

<br/><br/>

> 🛍️ **A modern, production-ready storefront** — shopping cart, real-time stock, Stripe checkout, and an admin dashboard, all in one repo.

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Store-6C63FF?style=for-the-badge)](#)
[![Getting Started](https://img.shields.io/badge/📖_Docs-Get_Started-3ECF8E?style=for-the-badge)](#-getting-started)
[![Report Bug](https://img.shields.io/badge/🐛_Bug-Report_Issue-FF6B6B?style=for-the-badge)](https://github.com/LuthandoCandlovu/my-store/issues)

</div>

<br/>

---

## 🖼️ Preview

<div align="center">

<br/>

<a href="#">
  <img src="https://github.com/user-attachments/assets/a996937d-08e0-41e1-a3fa-0429d397d360" alt="MyStore — Full Storefront Preview" width="100%" style="border-radius:12px;" />
</a>

<br/><br/>

> *The complete storefront — hero section, product grid, category filters & seamless shopping flow*

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🗄️ Database Schema](#️-database-schema)
- [🗺️ Route Map](#️-route-map)
- [📁 Project Structure](#-project-structure)
- [🏁 Getting Started](#-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

<div align="center">

| &nbsp; | Feature | Description |
|:---:|:---|:---|
| 🛒 | **Shopping Cart** | Persistent cart with localStorage — add, remove, update quantities across sessions |
| 💳 | **Stripe Payments** | Secure Stripe Checkout with full webhook lifecycle event handling |
| 📦 | **Live Stock** | Real-time inventory with automatic stock deduction on every purchase |
| 👑 | **Admin Dashboard** | Manage products, view orders, and update stock from a protected panel |
| 🎨 | **Beautiful UI** | Tailwind CSS with responsive, mobile-first design using Headless UI & Radix |
| 🔐 | **Auth Ready** | Supabase Auth with login/register pages included out of the box |
| 🛡️ | **Row Level Security** | Fine-grained data access control enforced at the Supabase database level |
| ⚡ | **Server Components** | Next.js 16 App Router with RSC for optimal performance and SEO |

</div>

---

## 🏗️ Architecture

```mermaid
flowchart TD
    subgraph Client["🌐 Client Layer"]
        B[Browser / Next.js UI]
        CC[🛒 Cart Context\nlocalStorage]
        SJ[💳 Stripe.js\nPayment UI]
    end

    subgraph Server["⚙️ Next.js 16 Server"]
        AR[📄 App Router\nPages & Layouts]
        SC[🧩 Server Components\nSSR / RSC]
        API[🔗 API Routes\n/api/*]
        WH[🪝 Webhook Handler\n/api/webhook]
    end

    subgraph Data["🗄️ Data Layer"]
        SB[(🐘 Supabase\nPostgreSQL + Auth\n+ Row Level Security)]
        ST[💳 Stripe API\nCheckout + Events]
    end

    B -->|HTTP| AR
    CC -->|State| AR
    SJ -->|Checkout| API
    AR --> SC
    AR --> API
    API --> WH
    SC -->|Query| SB
    API -->|Query| SB
    API -->|Create Session| ST
    ST -->|Webhook Events| WH
    WH -->|Update Orders| SB

    style Client fill:#1a1a2e,stroke:#6C63FF,color:#e8e8f0
    style Server fill:#16213e,stroke:#3ECF8E,color:#e8e8f0
    style Data fill:#0f3460,stroke:#635BFF,color:#e8e8f0
```

<br/>

### 🔧 Tech Stack

<div align="center">

<table>
<tr>
<th align="center" width="25%">⚛️ Frontend</th>
<th align="center" width="25%">🗄️ Backend</th>
<th align="center" width="25%">💳 Payments</th>
<th align="center" width="25%">🔄 State</th>
</tr>
<tr>
<td valign="top" align="center">

Next.js 16<br/>App Router<br/>TypeScript 5<br/>Tailwind CSS<br/>Headless UI<br/>Radix UI<br/>Lucide Icons

</td>
<td valign="top" align="center">

Supabase<br/>PostgreSQL<br/>Supabase Auth<br/>Row Level Security<br/>Server Components

</td>
<td valign="top" align="center">

Stripe Checkout<br/>Stripe Webhooks<br/>Payment lifecycle<br/>Idempotency keys<br/>Secure flow

</td>
<td valign="top" align="center">

React Context<br/>localStorage persist<br/>Server Components<br/>No Redux needed<br/>useCart hook

</td>
</tr>
</table>

</div>

---

## 🗄️ Database Schema

```mermaid
erDiagram
    PRODUCTS {
        UUID id PK
        TEXT name
        INT price_cents
        INT stock_qty
        TEXT category
        BOOLEAN is_active
    }

    ORDERS {
        UUID id PK
        TEXT status
        INT total_cents
        TEXT stripe_session_id
    }

    ORDER_ITEMS {
        UUID id PK
        UUID order_id FK
        UUID product_id FK
        INT qty
        INT price_cents
    }

    PRODUCTS ||--o{ ORDER_ITEMS : "referenced in"
    ORDERS ||--o{ ORDER_ITEMS : "contains"
```

<details>
<summary><strong>📄 View full SQL setup</strong></summary>

<br/>

```sql
-- ──────────────────────────────────────────────────
-- 1. Products
-- ──────────────────────────────────────────────────
CREATE TABLE products (
    id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT    NOT NULL,
    price_cents INT     NOT NULL,
    stock_qty   INT     NOT NULL,
    category    TEXT,
    is_active   BOOLEAN DEFAULT true
);

-- ──────────────────────────────────────────────────
-- 2. Orders
-- ──────────────────────────────────────────────────
CREATE TABLE orders (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    status            TEXT DEFAULT 'pending',
    total_cents       INT  NOT NULL,
    stripe_session_id TEXT UNIQUE
);

-- ──────────────────────────────────────────────────
-- 3. Order Items (join table)
-- ──────────────────────────────────────────────────
CREATE TABLE order_items (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id    UUID REFERENCES orders(id)   ON DELETE CASCADE,
    product_id  UUID REFERENCES products(id) ON DELETE RESTRICT,
    qty         INT NOT NULL,
    price_cents INT NOT NULL
);

-- ──────────────────────────────────────────────────
-- 4. Row Level Security
-- ──────────────────────────────────────────────────
ALTER TABLE products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders      ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Public can read active products
CREATE POLICY "Public read products"
    ON products FOR SELECT USING (is_active = true);
```

</details>

---

## 🗺️ Route Map

```
my-store/
│
├── /                        🏠  Homepage — hero + featured products
├── /menu                    🛍️  Product catalog with category filter
├── /product/[id]            📄  Product detail + add to cart
├── /cart                    🛒  Cart review + Stripe checkout
│
├── /checkout/
│   ├── success              ✅  Order confirmation
│   └── cancel               ❌  Payment cancelled fallback
│
└── /admin/
    ├── (index)              📊  Dashboard overview
    └── products             📦  Product & inventory management
```

---

## 📁 Project Structure

```
my-store/
├── 📁 app/                          # Next.js App Router root
│   ├── 📁 (shop)/                   # Public store routes
│   │   ├── page.tsx                 # / Homepage
│   │   ├── 📁 menu/                 # /menu catalog
│   │   ├── 📁 product/[id]/         # /product/:id dynamic page
│   │   └── 📁 cart/                 # /cart
│   ├── 📁 checkout/
│   │   ├── 📁 success/              # /checkout/success
│   │   └── 📁 cancel/               # /checkout/cancel
│   ├── 📁 admin/                    # Protected admin area
│   │   ├── page.tsx                 # /admin dashboard
│   │   └── 📁 products/             # /admin/products
│   └── 📁 api/
│       ├── 📁 checkout/             # POST — create Stripe session
│       └── 📁 webhook/              # POST — handle Stripe events
│
├── 📁 components/
│   ├── 📁 shop/                     # ProductCard, CartItem, Filters…
│   ├── 📁 admin/                    # AdminTable, StockEditor…
│   └── 📁 shared/                   # Navbar, Button, Modal…
│
├── 📁 contexts/
│   └── CartContext.tsx              # Global cart state + localStorage
│
├── 📁 lib/
│   └── 📁 supabase/
│       ├── client.ts                # Browser Supabase client
│       └── server.ts                # Server-side Supabase client
│
├── 📁 hooks/                        # useCart, useProducts, useAdmin…
├── 📁 scripts/
│   └── supabase-setup.sql          # ⭐ Run this first!
└── 📁 public/                       # Static assets
```

---

## 🏁 Getting Started

### Prerequisites

| Tool | Version | Link |
|:---|:---|:---|
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| Supabase account | Free tier | [supabase.com](https://supabase.com) |
| Stripe account | Free test mode | [stripe.com](https://stripe.com) |

### Installation

**1️⃣ Clone the repo**

```bash
git clone https://github.com/LuthandoCandlovu/my-store.git
cd my-store
```

**2️⃣ Install dependencies**

```bash
npm install
```

**3️⃣ Configure environment variables**

```bash
cp .env.example .env.local
# Fill in your Supabase and Stripe keys — see below
```

**4️⃣ Set up the database**

Open your [Supabase SQL Editor](https://app.supabase.com), paste the contents of `scripts/supabase-setup.sql`, and run it.

**5️⃣ Start the development server**

```bash
npm run dev
```

**6️⃣ Open your store**

```
http://localhost:3000/menu
```

> 🧪 **Connection check** → `http://localhost:3000/menu/debug`

---

## 🔑 Environment Variables

```env
# ── Supabase ────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...

# ── Stripe ──────────────────────────────────────────────
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ── App ─────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ **Never commit `.env.local`** — it is already included in `.gitignore`.

---

## 🚢 Deployment

### Deploy to Vercel *(Recommended)*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LuthandoCandlovu/my-store)

1. Push your code to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add your **production** environment variables in the Vercel dashboard
4. Hit **Deploy** 🎉

**Production keys** — swap test for live:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

> 📌 Register `https://your-domain.com/api/webhook` as a live endpoint in your [Stripe Dashboard](https://dashboard.stripe.com/webhooks).

---

## 🤝 Contributing

Contributions are welcome and appreciated!

```bash
# 1. Fork the repo on GitHub

# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes  (Conventional Commits style)
git commit -m "feat: add amazing feature"

# 4. Push to GitHub
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

---

## 📝 License

Distributed under the **MIT License** — see [`LICENSE`](LICENSE) for details.

---

## 🙏 Acknowledgements

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Capsule Render](https://github.com/kyechan99/capsule-render) for the animated banners
- [Readme Typing SVG](https://github.com/DenverCoder1/readme-typing-svg) for the typewriter effect

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=160&section=footer&text=Happy+Shopping!&fontSize=32&fontColor=ffffff&fontAlignY=65&animation=fadeIn" width="100%" />

<br/>

**Built with ❤️ by [Luthando Candlovu](https://github.com/LuthandoCandlovu)**

<br/>

[![GitHub stars](https://img.shields.io/github/stars/LuthandoCandlovu/my-store?style=social)](https://github.com/LuthandoCandlovu/my-store)
&nbsp;
[![GitHub forks](https://img.shields.io/github/forks/LuthandoCandlovu/my-store?style=social)](https://github.com/LuthandoCandlovu/my-store/fork)
&nbsp;
![visitors](https://visitor-badge.laobi.icu/badge?page_id=LuthandoCandlovu.my-store&left_color=6C63FF&right_color=3ECF8E)

<br/>

⭐ **Star this repo** if you found it helpful!

</div>
