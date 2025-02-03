module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8001/api/:path*",
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
