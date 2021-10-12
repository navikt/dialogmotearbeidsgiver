require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const getDecorator = require('./decorator');
const prometheus = require('prom-client');
const proxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Prometheus metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const isdalogmoteEnvVar = () => {
  const fromEnv = process.env.ISDIALOGMOTE_HOST;
  if (fromEnv) {
    return fromEnv;
  }

  throw new Error(`Missing required environment variable ISDIALOGMOTE_HOST`);
};

const sykmeldingerArbeidsgiverEnvVar = () => {
  const fromEnv = process.env.SYKMELDINGER_ARBEIDSGIVER_URL;
  if (fromEnv) {
    return fromEnv;
  }

  throw new Error(`Missing required environment variable SYKMELDINGER_ARBEIDSGIVER_URL`);
};

const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['route'],
  // buckets for response time from 0.1ms to 500ms
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
});
const server = express();

const env = process.argv[2];
const settings = env === 'local' ? { isProd: false } : require('./settings.json');

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const renderPage = (decoratorFragments, isFrontPage) => {
  return new Promise((resolve, reject) => {
    server.render(
      'index.html',
      Object.assign(
        {
          LOGINSERVICE_URL: `${process.env.LOGINSERVICE_URL}`,
          spinnerMedTekst: isFrontPage,
          spinnerUtenTekst: !isFrontPage,
        },
        decoratorFragments,
        settings
      ),
      (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      }
    );
  });
};

const renderSubpages = (decoratorFragments) => {
  return renderPage(decoratorFragments, false);
};

const renderFrontPage = (decoratorFragments) => {
  return renderPage(decoratorFragments, true);
};

const renderApp = (decoratorFragments) => {
  return Promise.all([renderFrontPage(decoratorFragments), renderSubpages(decoratorFragments)]);
};

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

const startServer = (html) => {
  const htmlFrontPage = html[0];
  const htmlOtherPages = html[1];

  if (env === 'local' || env === 'opplaering') {
    require('./mock/mockEndepunkter').mockForOpplaeringsmiljo(server);
  } else {
    const isdialogmoteHost = isdalogmoteEnvVar();
    const ISDIALOGMOTE_BASE_PATH = '/api/v1/narmesteleder/brev';
    const PROXY_ISDIALOGMOTE_BASE_PATH = `/dialogmotearbeidsgiver/api/v1/narmesteleder/brev`;

    server.use(
      `${PROXY_ISDIALOGMOTE_BASE_PATH}/:uuid/les`,
      cookieParser(),
      proxy(isdialogmoteHost, {
        https: true,
        parseReqBody: false,
        proxyReqOptDecorator(proxyReqOpts, srcReq) {
          const token = srcReq.cookies['selvbetjening-idtoken'];
          proxyReqOpts.headers.Authorization = `Bearer ${token}`;
          proxyReqOpts.headers['Content-Type'] = 'application/json';
          return proxyReqOpts;
        },
        proxyReqPathResolver(req) {
          const { uuid } = req.params;
          return `${ISDIALOGMOTE_BASE_PATH}/${uuid}/les`;
        },
        proxyErrorHandler(err, res, next) {
          console.log('Error in proxy for isdialogmote', err.message);
          next(err);
        },
      })
    );

    server.use(
      `${PROXY_ISDIALOGMOTE_BASE_PATH}/:uuid/pdf`,
      cookieParser(),
      proxy(isdialogmoteHost, {
        https: true,
        parseReqBody: false,
        proxyReqOptDecorator(proxyReqOpts, srcReq) {
          const token = srcReq.cookies['selvbetjening-idtoken'];
          proxyReqOpts.headers.Authorization = `Bearer ${token}`;
          proxyReqOpts.headers['Content-Type'] = 'application/json';
          return proxyReqOpts;
        },
        proxyReqPathResolver(req) {
          const { uuid } = req.params;
          return `${ISDIALOGMOTE_BASE_PATH}/${uuid}/pdf`;
        },
        proxyErrorHandler(err, res, next) {
          console.log('Error in proxy for isdialogmote', err.message);
          next(err);
        },
      })
    );

    server.use(
      PROXY_ISDIALOGMOTE_BASE_PATH,
      cookieParser(),
      proxy(isdialogmoteHost, {
        https: true,
        parseReqBody: false,
        proxyReqOptDecorator(proxyReqOpts, srcReq) {
          const token = srcReq.cookies['selvbetjening-idtoken'];
          proxyReqOpts.headers.Authorization = `Bearer ${token}`;
          proxyReqOpts.headers['Content-Type'] = 'application/json';
          return proxyReqOpts;
        },
        proxyReqPathResolver() {
          return ISDIALOGMOTE_BASE_PATH;
        },
        proxyErrorHandler(err, res, next) {
          console.log('Error in proxy for isdialogmote', err.message);
          next(err);
        },
      })
    );

    const sykmeldingerArbeidsgiverHost = sykmeldingerArbeidsgiverEnvVar();
    server.use(
      '/dialogmotearbeidsgiver/api/dinesykmeldte',
      createProxyMiddleware({
        target: `${sykmeldingerArbeidsgiverHost}`,
        pathRewrite: {
          '^/dialogmotearbeidsgiver/api/dinesykmeldte': '/api/dinesykmeldte',
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
  }

  server.use('/dialogmotearbeidsgiver/resources', express.static(path.resolve(__dirname, 'dist/resources')));

  server.use('/dialogmotearbeidsgiver/img', express.static(path.resolve(__dirname, 'dist/resources/img')));

  server.get(
    ['/', '/dialogmotearbeidsgiver/?', /^\/dialogmotearbeidsgiver\/(?!(resources|img)).*$/],
    nocache,
    (req, res) => {
      const htmlRespons =
        req.url === 'dialogmotearbeidsgiver' || req.url === 'dialogmotearbeidsgiver/' ? htmlFrontPage : htmlOtherPages;
      res.send(htmlRespons);
      httpRequestDurationMicroseconds.labels(req.route.path).observe(10);
    }
  );

  server.get('/actuator/metrics', (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.end(prometheus.register.metrics());
  });

  server.get('/health/isAlive', (req, res) => {
    res.sendStatus(200);
  });

  server.get('/health/isReady', (req, res) => {
    res.sendStatus(200);
  });

  if (env === 'local') {
    require('./mock/mockEndepunkter').mockEndepunkterForLokalmiljo(server);
  }

  const port = env !== 'local' ? process.env.PORT : 8189;
  server.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
};

const logError = (errorMessage, details) => {
  console.log(errorMessage, details);
};

getDecorator()
  .then(renderApp, (error) => {
    logError('Failed to render app', error);
  })
  .then(startServer, (error) => {
    logError('Failed to render app', error);
  });
