/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: ['localhost', '127.0.0.1', '*.local', '10.20.18.*'],
}

module.exports = nextConfig
