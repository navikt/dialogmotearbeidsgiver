const path = require('path');
const fs = require('fs');
const express = require('express');
const mockSyfomoteadmin = require('./mockSyfomoteadmin');
const mockSyfomotebehov = require('./mockSyfomotebehov');
const mockSyforest = require('./mockSyforest');

const mockData = {};

const lastFilTilMinne = (filnavn) => {
  fs.readFile(path.join(__dirname, `/data/${filnavn}.json`), (err, data) => {
    if (err) {
      console.log(`feil i ${filnavn}`);
      throw err;
    }
    mockData[filnavn] = JSON.parse(data.toString());
  });
};

const MOTER = 'moter';

lastFilTilMinne(MOTER);

function mockEndepunkter(server) {
  server.use(express.json());
  server.use(express.urlencoded());

  server.get('/esso/logout', (req, res) => {
    res.send(
      '<p>Du har blitt sendt til utlogging.</p><p><a href="/sykefravaerarbeidsgiver">Gå til Dine Sykmeldte</a></p>'
    );
  });

  server.get('/dittnav', (req, res) => {
    res.send(
      '<p>Ditt Nav er ikke tilgjengelig - dette er en testside som kun viser Dine sykmeldte.</p><p><a href="/sykefravaerarbeidsgiver">Gå til Dine sykemeldte</a></p>'
    );
  });

  server.post('/syfomotebehov/api/v2/motebehov', (req, res) => {
    const nyttMotebehov = req.body;

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(nyttMotebehov));
  });

  [mockSyfomoteadmin, mockSyfomotebehov, mockSyforest].forEach((func) => {
    func(server);
  });
}

module.exports = mockEndepunkter;
