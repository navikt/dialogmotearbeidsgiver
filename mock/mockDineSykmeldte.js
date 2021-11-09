const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockDineSykmeldte(server) {
  server.get('/syk/dialogmotearbeidsgiver/api/dinesykmeldte/123', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[enums.SYKMELDTE]));
  });
}

module.exports = mockDineSykmeldte;
