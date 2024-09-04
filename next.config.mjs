/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
