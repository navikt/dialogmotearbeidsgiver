const path = require('path');
const fs = require('fs');
const request = require('request');
const express = require('express');

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const mockData = {};

const lastFilTilMinne = (filnavn) => {
    fs.readFile(path.join(__dirname, `/data/${filnavn}.json`), (err, data) => {
        if (err) {
            console.log('feil i ' + filnavn);
            throw err;
        }
        ;
        mockData[filnavn] = JSON.parse(data.toString());
    });
};

const BERIK = 'berik';
const MOTEBEHOV = 'motebehov';
const MOTER = 'moter';
const PERIODER = 'perioder';
const PERIODER2 = 'perioder2';
const SYKMELDINGER = 'sykmeldinger';
const SYKMELDTE = 'sykmeldte';
const TEKSTER = 'tekster';

lastFilTilMinne(SYKMELDTE);
lastFilTilMinne(SYKMELDINGER);
lastFilTilMinne(MOTER);
lastFilTilMinne(BERIK);
lastFilTilMinne(PERIODER);
lastFilTilMinne(PERIODER2);
lastFilTilMinne(MOTEBEHOV);
lastFilTilMinne(BERIK);
lastFilTilMinne(TEKSTER);

let teksterFraProd;

function hentTeksterFraProd() {
    const TEKSTER_URL = 'https://syfoapi.nav.no/syfotekster/api/tekster';
    request(TEKSTER_URL, function (error, response, body) {
        if (error) {
            console.log('Kunne ikke hente tekster fra prod', error);
        } else {
            try {
                teksterFraProd = JSON.parse(body);
                console.log('Tekster hentet fra prod');
            } catch (e) {
                console.log('Kunne ikke hente tekster fra prod');
            }
        }
    });
}

function mockTekster(server) {
    const HVERT_FEMTE_MINUTT = 1000 * 60 * 5;
    hentTeksterFraProd();
    setInterval(hentTeksterFraProd, HVERT_FEMTE_MINUTT);

    server.get('/syfotekster/api/tekster', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(teksterFraProd || mockData[TEKSTER]));
    });
}

function mockForOpplaeringsmiljo(server) {
    mockTekster(server);

    server.use(express.json());
    server.use(express.urlencoded());

    server.get('/syforest/arbeidsgiver/sykmeldte', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[SYKMELDTE]));
    });

    server.get('/syforest/arbeidsgiver/sykmeldte/berik', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[BERIK]));
    });

    server.post('/syforest/oppgaver/:id/actions/utfoert', (req, res) => {
        res.send(200);
    });

    server.get('/syforest/arbeidsgiver/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const koblingId = req.query.koblingId;
        res.send(JSON.stringify(mockData[SYKMELDINGER][koblingId] || []));
    });

    server.get('/syfomoteadmin/api/bruker/arbeidsgiver/moter', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[MOTER]));
    });

    server.get('/syforest/sykeforloep/siste/perioder', (req, res) => {
        const orgnr = req.query.orgnr;
        if (orgnr === '000111222') {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(mockData[PERIODER2]));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(mockData[PERIODER]));
        }
    });

    server.get('/esso/logout', (req, res) => {
        res.send('<p>Du har blitt sendt til utlogging.</p><p><a href="/sykefravaerarbeidsgiver">Gå til Dine Sykmeldte</a></p>');
    });

    server.get('/dittnav', (req, res) => {
        res.send('<p>Ditt Nav er ikke tilgjengelig - dette er en testside som kun viser Dine sykmeldte.</p><p><a href="/sykefravaerarbeidsgiver">Gå til Dine sykemeldte</a></p>');
    });
}

function mockPilotEndepunkterForLokalmiljo(server) {
    server.get('/syfomotebehov/api/motebehov', (req, res) => {
        const orgnr = req.query.virksomhetsnummer;
        if (orgnr === '000111222') {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify([]));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(mockData[MOTEBEHOV]));
        }
    });

    server.post('/syfomotebehov/api/motebehov', (req, res) => {
        const nyttMotebehov = req.body;

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(nyttMotebehov));
    });
}

function mockPilotEndepunkterForOpplaeringsmiljo(server) {
    server.get('/syfomotebehov/api/motebehov', (req, res) => {
        res.status(403);
        res.send();
    });
}

module.exports = {
    mockForOpplaeringsmiljo,
    mockPilotEndepunkterForLokalmiljo,
    mockPilotEndepunkterForOpplaeringsmiljo,
};
