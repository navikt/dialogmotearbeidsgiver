const path = require('path');
const fs = require('fs');
const request = require('request');
const express = require('express');
const mockSyforest = require('./mockSyforest');

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

const MOTEBEHOV = 'motebehov';
const MOTER = 'moter';
const TEKSTER = 'tekster';

lastFilTilMinne(MOTER);
lastFilTilMinne(MOTEBEHOV);
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

    server.get('/syfomoteadmin/api/bruker/arbeidsgiver/moter', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[MOTER]));
    });

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

    server.get('/esso/logout', (req, res) => {
        res.send('<p>Du har blitt sendt til utlogging.</p><p><a href="/sykefravaerarbeidsgiver">Gå til Dine Sykmeldte</a></p>');
    });

    server.get('/dittnav', (req, res) => {
        res.send('<p>Ditt Nav er ikke tilgjengelig - dette er en testside som kun viser Dine sykmeldte.</p><p><a href="/sykefravaerarbeidsgiver">Gå til Dine sykemeldte</a></p>');
    });

    [
        mockSyforest,
    ].forEach((func) => {
        func(server);
    });
}

function mockEndepunkterForLokalmiljo(server) {
    server.post('/syfomotebehov/api/motebehov', (req, res) => {
        const nyttMotebehov = req.body;

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(nyttMotebehov));
    });
}

module.exports = {
    mockForOpplaeringsmiljo,
    mockEndepunkterForLokalmiljo,
};
