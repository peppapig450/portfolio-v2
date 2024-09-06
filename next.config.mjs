/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "personal-portfolio-products.imgix.net",
            },
        ],
        loader: "custom",
        loaderFile: "loader.ts",
    }
};

export default nextConfig;
