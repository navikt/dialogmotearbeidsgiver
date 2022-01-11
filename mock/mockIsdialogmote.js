const referat = require('../mock/data/MVP/referatByteArray.json');

function mockIsdialogmote(server) {
  server.get('/syk/dialogmotearbeidsgiver/api/v1/narmesteleder/brev', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([]));
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
