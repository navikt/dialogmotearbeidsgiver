const mockData = require('./mockData');
const enums = require('./mockDataEnums');

const mockSyforest = (server) => {
    server.get('/syforest/arbeidsgiver/sykmeldte', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKMELDTE]));
    });

    server.get('/syforest/arbeidsgiver/sykmeldte/berik', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.BERIK]));
    });

    server.post('/syforest/oppgaver/:id/actions/utfoert', (req, res) => {
        res.send(200);
    });
};

module.exports = mockSyforest;
