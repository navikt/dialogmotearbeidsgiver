const mockData = require('./mockData');
const enums = require('./mockDataEnums');

const mockSyfomotebehov = (server) => {
    server.get('/syfomotebehov/api/v2/motebehov', (req, res) => {
        const orgnr = req.query.virksomhetsnummer;
        if (orgnr === '000111222') {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                visMotebehov: true,
                skjemaType: 'SVAR_BEHOV',
                motebehov: null,
            }));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(
                {
                    visMotebehov: true,
                    skjemaType: 'SVAR_BEHOV',
                    motebehov: mockData[enums.MOTEBEHOV][0],
                },
            ));
        }
    });
};

module.exports = mockSyfomotebehov;
