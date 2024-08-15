const {createProxyMiddleware} = require('http-proxy-middleware') //������ڳ�ʼ�����ּ�ʱ�Ͱ�װ�ˣ����Բ��ö��ⰲװ
 
module.exports = function(app) {
  app.use('/api1',
    createProxyMiddleware('/api1', {
      target: 'http://localhost:5000',     //����ת��Ŀ���ַ
      //���Ʒ��������յ�������ͷ��host�ֶε�ֵ��Ĭ��Ϊfalse��
      //Ϊtrue,�����hostΪ��localhost:5000;Ϊfalse,�����hostΪ��localhost:3000
      changeOrigin: true,
      pathRewrite: {'^/api1':''}           //�޸�url��ȥ������ǰ׺'/api1'
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
