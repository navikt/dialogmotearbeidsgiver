const referat = {
  uuid: 'mock-uuid2',
  deltakerUuid: 'mock-deltaker-uuid',
  createdAt: '2019-11-08T12:35:37.669+01:00',
  brevType: 'REFERAT',
  lestDato: null,
  digitalt: true,
  fritekst: 'Fri tekst',
  sted: 'Videomøte på Teams',
  tid: '2050-11-08T12:35:37.669+01:00',
  videoLink: 'https://teams.microsoft.com/l/osv.osv.osv',
  document: [
    {
      type: 'HEADER',
      texts: ['REFERAT 2050-11-08'],
    },
    {
      type: 'PARAGRAPH',
      key: 'OKONOMISK_STOTTE',
      texts: [
        'Formålet med dialogmøtet var å oppsummere situasjonen, drøfte mulighetene for å arbeide og legge en plan for tiden framover.',
      ],
    },
    {
      type: 'HEADER',
      texts: ['Dette skjedde i møtet'],
    },
    {
      type: 'PARAGRAPH',
      key: 'AVKLARING_ARBEIDSEVNE',
      title: 'Konklusjon',
      texts: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      ],
    },
    {
      type: 'PARAGRAPH',
      key: 'FRISKMELDING_ARBEIDSFORMIDLING',
      title: 'Din oppgave',
      texts: [
        '(Arbeidstakerens oppgave) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ],
    },
    {
      type: 'PARAGRAPH',
      texts: ['Med hilsen', 'NAV Staden', 'Kari Saksbehandler', 'kari@nav.no', '99998888'],
    },
  ],
  virksomhetsnummer: '1234',
};

module.exports = referat;
