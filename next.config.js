module.exports = {
  // Target must be serverless
  target: 'serverless',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};
