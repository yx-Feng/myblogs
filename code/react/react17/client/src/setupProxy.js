const {createProxyMiddleware} = require('http-proxy-middleware') //这个库在初始化脚手架时就安装了，所以不用额外安装
 
module.exports = function(app) {
  app.use('/api1',
    createProxyMiddleware('/api1', {
      target: 'http://localhost:5000',     //配置转发目标地址
      //控制服务器接收到的请求头中host字段的值，默认为false。
      //为true,这里的host为：localhost:5000;为false,这里的host为：localhost:3000
      changeOrigin: true,
      pathRewrite: {'^/api1':''}           //修改url，去除请求前缀'/api1'
    }),
  );
  app.use('/api2',
    createProxyMiddleware('/api2', {
        target: 'http://localhost:5001',
        changeOrigin: true,
        pathRewrite: {'^/api2':''}
      })
  ); 
}
