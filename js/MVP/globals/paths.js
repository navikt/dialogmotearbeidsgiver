export const ISDIALOGMOTE_PROXY_BASE_PATH = `${process.env.REACT_APP_CONTEXT_ROOT}/api/v1/narmesteleder/brev`;
export const SYKMELDTE_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/api/dinesykmeldte`;
export const MOTEBEHOV_API = `${process.env.REACT_APP_CONTEXT_ROOT}/api/motebehov`;
export const MOTEADMIN_API = `${process.env.REACT_APP_CONTEXT_ROOT}/api/moteadmin`;
export const LANDING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}`;

// Statiske URLer
export const statiskeURLer = {
  KONTAKT_INFO_URL: 'https://arbeidsgiver.nav.no/kontakt-oss/',
  PERSONVERN_URL: 'http://www.nav.no/personvern',
  DIALOGMOTE_INFO_URL:
    'https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/slik-folger-du-opp-sykmeldte/dialogmote-2-og-3-nav_kap',
  VIDEOMOTE_INFO_URL: 'https://www.nav.no/no/nav-og-samfunn/kontakt-nav/slik-deltar-du-i-videomote-med-nav',
};

export const getOppfolgingsplanerUrl = (narmestelederId) => {
  return `${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/${narmestelederId}/oppfolgingsplaner`;
};

export const getMotebehovUrl = (narmestelederId) => {
  return `${LANDING_URL}/${narmestelederId}/behov`;
};

export const getHentMotebehovUrl = (fnr, virksomhetsnummer) => {
  return `${MOTEBEHOV_API}?fnr=${fnr}&virksomhetsnummer=${virksomhetsnummer}`;
};

export const getSykmeldteUrl = (narmesteLederId) => {
  return `${SYKMELDTE_URL}/${narmesteLederId}`;
};

export const getMoteinnkallelseUrl = (narmestelederId) => {
  return `${LANDING_URL}/${narmestelederId}/innkallelse`;
};

export const getReferatUrl = (narmestelederId) => {
  return `${LANDING_URL}/${narmestelederId}/referat`;
};

// Breadcrumbs
const dineSykmeldteBreadcrumb = [
  {
    tittel: 'Dine sykmeldte',
    sti: '/arbeidsgiver/sykmeldte',
    erKlikkbar: true,
    sisteSmule: false,
  },
];

export const emptyBreadcrumb = () => {
  return dineSykmeldteBreadcrumb;
};

export const dialogmoteBreadcrumb = (sykmeldt) => {
  return [
    ...dineSykmeldteBreadcrumb,
    {
      tittel: `${sykmeldt.navn}`,
      sti: `/arbeidsgiver/sykmeldte/${sykmeldt.narmestelederId}`,
      erKlikkbar: true,
      sisteSmule: false,
    },
    {
      tittel: 'Dialogmøter',
      sti: `/${sykmeldt.narmestelederId}/`,
      erKlikkbar: true,
      sisteSmule: false,
    },
  ];
};

export const innkallelseBreadcrumb = (title, sykmeldt) => [
  ...dialogmoteBreadcrumb(sykmeldt),
  {
    tittel: title,
    sti: getMoteinnkallelseUrl(sykmeldt.narmestelederId),
    erKlikkbar: true,
    sisteSmule: false,
  },
];
export const referatBreadcrumb = (sykmeldt) => [
  ...dialogmoteBreadcrumb(sykmeldt),
  {
    tittel: 'Referat fra dialogmøte',
    sti: getReferatUrl(sykmeldt.narmestelederId),
    erKlikkbar: true,
    sisteSmule: false,
  },
];
