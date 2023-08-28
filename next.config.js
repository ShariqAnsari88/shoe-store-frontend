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
};

module.exports = nextConfig;
