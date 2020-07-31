const createProxyMiddleware = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'http://127.0.0.1:3001',
      changeOrigin: true,
      secure: false,
    })
  );
  app.listen(3001);
};




//const proxy = require('http-proxy-middleware');
    //module.exports = function(app) {
    //app.use(proxy('/api', 
        //{ target: 'http://localhost:3001/'}
      //));
 // }
    
 