const mockData = require('./mockData');
const enums = require('./mockDataEnums');

const mockSyfomotebehov = (server) => {
    server.get('/syfomotebehov/api/motebehov', (req, res) => {
        const orgnr = req.query.virksomhetsnummer;
        if (orgnr === '000111222') {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify([]));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(mockData[enums.MOTEBEHOV]));
        }
    });
};

module.exports = mockSyfomotebehov;
