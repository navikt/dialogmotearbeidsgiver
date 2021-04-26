require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const getDecorator = require('./decorator');
const prometheus = require('prom-client');
// Prometheus metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

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
          SYFOREST_URL: '/syforest',
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

  if (env === 'local' || env === 'opplaering') {
    require('./mock/mockEndepunkter')(server);
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
