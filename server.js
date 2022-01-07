require('dotenv').config();

const express = require('express');
const path = require('path');
const prometheus = require('prom-client');
const getHtmlWithDecorator = require('./server/getHtmlWithDecorator');
const winstonLogger = require('./server/winstonLogger');
const appProxy = require('./server/appProxy');
const cookieParser = require('cookie-parser');

// Prometheus metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const server = express();
const env = process.argv[2];

server.disable('x-powered-by');

const DIST_DIR = path.join(__dirname, './dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

function disableCache(res) {
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.setHeader('Expires', '-1');
}

server.get('/', (req, res) => {
  res.redirect('/syk/dialogmotearbeidsgiver');
});

server.use('/syk/dialogmotearbeidsgiver/static', express.static(DIST_DIR, { index: false }));
server.get('/internal/isAlive|isReady', (req, res) => res.sendStatus(200));

server.use(cookieParser());

if (env === 'opplaering') {
  require('./mock/mockEndepunkter').mockForOpplaeringsmiljo(server);
} else {
  appProxy(server);

  server.get('/actuator/metrics', (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.end(prometheus.register.metrics());
  });
}

server.use(express.json());

server.use('*', (req, res) =>
  getHtmlWithDecorator(HTML_FILE)
    .then((html) => {
      disableCache(res);
      res.send(html);
    })
    .catch((e) => {
      winstonLogger.error(e);
      disableCache(res);
      res.status(500).send(e);
    })
);

const port = process.env.PORT || 8080;
server.listen(port, () => winstonLogger.info(`App listening on port: ${port}`));
