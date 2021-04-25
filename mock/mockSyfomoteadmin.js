const mockData = require('./mockData');
const enums = require('./mockDataEnums');

const mockSyfomoteadmin = (server) => {
  server.get('/syfomoteadmin/api/bruker/arbeidsgiver/moter', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[enums.MOTER]));
  });
};

module.exports = mockSyfomoteadmin;
