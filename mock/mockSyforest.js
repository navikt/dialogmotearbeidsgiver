const mockData = require('./mockData');
const enums = require('./mockDataEnums');

const MILLISEKUNDER_PER_DAG = 86400000;
const leggTilDagerPaDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() + (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

const OPPFOLGINGSFORLOP_TYPE = {
    MOTEBEHOV_AKTIV: {
        fomUke: 16,
        tomUke: 17,
    },
    MOTEBEHOV_INAKTIV: {
        fomUke: 15,
        tomUke: 17,
    },
};

const getPerioder = (type) => {
    const perioder = mockData[enums.PERIODER];
    const today = new Date();
    return [
        {
            ...perioder[0],
            fom: leggTilDagerPaDato(today, -(type.fomUke * 7)).toJSON(),
            tom: leggTilDagerPaDato(today, ((type.tomUke - type.fomUke) * 7)).toJSON(),
        },
    ];
};

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

    server.get('/syforest/arbeidsgiver/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const koblingId = req.query.koblingId;
        res.send(JSON.stringify(mockData[enums.SYKMELDINGER][koblingId] || []));
    });

    server.get('/syforest/sykeforloep/siste/perioder', (req, res) => {
        const orgnr = req.query.orgnr;
        if (orgnr === '000111222') {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(getPerioder(OPPFOLGINGSFORLOP_TYPE.MOTEBEHOV_INAKTIV)));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(getPerioder(OPPFOLGINGSFORLOP_TYPE.MOTEBEHOV_AKTIV)));
        }
    });
};

module.exports = mockSyforest;
