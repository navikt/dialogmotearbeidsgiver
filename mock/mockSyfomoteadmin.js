const mockData = require('./mockData');
const enums = require('./mockDataEnums');

const mockSyfomoteadmin = (server) => {
  server.get('/syk/dialogmotearbeidsgiver/api/moteadmin', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[enums.MOTER]));
  });
};

module.exports = mockSyfomoteadmin;
