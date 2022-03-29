const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('https://edanchu.github.io/greg/api', {
      //target: 'http://localhost:8888',
      target: 'https://g-r-e-g.herokuapp.com',
      changeOrigin: true,
    })
  );
};
