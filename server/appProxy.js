const { createProxyMiddleware } = require('http-proxy-middleware');

const appProxy = (server) => {
  server.use(
    '/syk/dialogmotearbeidsgiver/api/v1/narmesteleder/brev',
    createProxyMiddleware({
      target: process.env.ISDIALOGMOTE_HOST,
      pathRewrite: {
        '^/syk/dialogmotearbeidsgiver/api/v1/narmesteleder/brev': '/api/v1/narmesteleder/brev',
      },
      onError: (err, req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify({
            error: `Failed to connect to API. Reason: ${err}`,
          })
        );
        res.end();
      },
      onProxyReq(proxyReq, req, res) {
        const token = req.cookies['selvbetjening-idtoken'];
        proxyReq.setHeader('Authorization', `Bearer ${token}`);
      },
      logLevel: 'error',
      changeOrigin: true,
    })
  );

  server.use(
    '/syk/dialogmotearbeidsgiver/api/dinesykmeldte',
    createProxyMiddleware({
      target: process.env.SYKMELDINGER_ARBEIDSGIVER_URL,
      pathRewrite: {
        '^/syk/dialogmotearbeidsgiver/api/dinesykmeldte': '/api/dinesykmeldte',
      },
      onError: (err, req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify({
            error: `Failed to connect to API. Reason: ${err}`,
          })
        );
        res.end();
      },
      logLevel: 'error',
      changeOrigin: true,
    })
  );

  server.use(
    '/syk/dialogmotearbeidsgiver/api/motebehov',
    createProxyMiddleware({
      target: process.env.SYFOMOTEBEHOV_HOST,
      pathRewrite: {
        '^/syk/dialogmotearbeidsgiver/api/motebehov': '/syfomotebehov/api/v2/motebehov',
      },
      onError: (err, req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify({
            error: `Failed to connect to API. Reason: ${err}`,
          })
        );
        res.end();
      },
      logLevel: 'error',
      changeOrigin: true,
    })
  );

  server.use(
    '/syk/dialogmotearbeidsgiver/api/moteadmin',
    createProxyMiddleware({
      target: process.env.SYFOMOTEADMIN_HOST,
      pathRewrite: {
        '^/syk/dialogmotearbeidsgiver/api/moteadmin': '/syfomoteadmin/api/bruker',
      },
      onError: (err, req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify({
            error: `Failed to connect to API. Reason: ${err}`,
          })
        );
        res.end();
      },
      logLevel: 'error',
      changeOrigin: true,
    })
  );
};

module.exports = appProxy;
