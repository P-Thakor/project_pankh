module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8000/api/:path*',
        },
      ];
    },
    images: {
      domains: ['res.cloudinary.com'],
    },
  };
  