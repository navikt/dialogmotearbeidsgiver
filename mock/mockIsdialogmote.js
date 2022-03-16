const referat = require('../mock/data/MVP/referatByteArray.json');
const innkallelse = require('./data/MVP/innkallelse2');
const referatBrev = require('./data/MVP/referat');
const referatBrev2 = require('./data/MVP/referat2');

function mockIsdialogmote(server) {
  server.get('/syk/dialogmotearbeidsgiver/api/v1/narmesteleder/brev', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([innkallelse, referatBrev, referatBrev2]));
  });

  server.post('/syk/dialogmotearbeidsgiver/api/v1/narmesteleder/brev/:uuid/les', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendStatus(200);
  });

  server.get('/syk/dialogmotearbeidsgiver/api/v1/narmesteleder/brev/:uuid/referat', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(referat);
  });

  server.post('/syk/dialogmotearbeidsgiver/api/v1/narmesteleder/brev/:uuid/respons', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendStatus(200);
  });
}

module.exports = mockIsdialogmote;
