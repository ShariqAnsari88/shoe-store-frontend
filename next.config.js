/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 120,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
    NEXT_STRIPE_PK_TEST: process.env.NEXT_STRIPE_PK_TEST,
    NEXT_STRIPE_PK_LIVE: process.env.NEXT_STRIPE_PK_LIVE,
    NEXT_STRIPE_SK_TEST: process.env.NEXT__STRIPE_SK_TEST,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SPEEDY_API_URL: process.env.SPEEDY_API_URL,
  },
};

module.exports = nextConfig;
