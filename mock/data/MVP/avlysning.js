const innkallelse = {
  uuid: 'mock-uuid7',
  deltakerUuid: 'mock-deltaker-uuid',
  createdAt: '2019-11-08T12:35:37.669+01:00',
  brevType: 'AVLYST',
  digitalt: true,
  lestDato: null,
  fritekst: 'Fri tekst',
  sted: 'Videomøte på Teams',
  tid: '2040-11-08T12:35:37.669+01:00',
  videoLink: 'https://teams.microsoft.com/l/osv.osv.osv',
  document: [
    {
      type: 'PARAGRAPH',
      texts: ['Hei Artig Trane'],
    },
    {
      type: 'PARAGRAPH',
      texts: [
        'NAV har tidligere innkalt til dialogmøte som skulle vært avholdt 22.10.2021 klokka 12. Dette møtet er avlyst.',
      ],
    },
    {
      type: 'PARAGRAPH',
      texts: ['Her kommer en fritekst skrevet av veilederen.'],
    },
    {
      type: 'PARAGRAPH',
      texts: ['Med hilsen', 'NAV Staden', 'Kari Saksbehandler'],
    },
  ],
  virksomhetsnummer: '1234',
};

module.exports = innkallelse;
