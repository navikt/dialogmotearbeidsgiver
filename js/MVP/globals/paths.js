import { API_NAVN, hentSyfoApiUrl } from '../../gateway-api';

export const ISDIALOGMOTE_PROXY_BASE_PATH = `/dialogmotearbeidsgiver/api/v1/narmesteleder/brev`;
export const MOTEBEHOV_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/motebehov`;
export const MOTEADMIN_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN)}/bruker/arbeidsgiver/moter`;
export const SYKMELDTE_URL = `${process.env.REACT_APP_SYFOREST_ROOT}/arbeidsgiver/sykmeldte`;

export const LANDING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}`;
export const MOTEREFERAT_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/referat`;

// Statiske URLer
export const statiskeURLer = {
  KONTAKT_INFO_URL: 'https://arbeidsgiver.nav.no/kontakt-oss/',
  PERSONVERN_URL: 'http://www.nav.no/personvern',
  DIALOGMOTE_INFO_URL:
    'https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/slik-folger-du-opp-sykmeldte/dialogmote-2-og-3-nav_kap',
};

export const getOppfolgingsplanerUrl = (koblingId) => {
  return `${LANDING_URL}/${koblingId}/oppfolgingsplaner`;
};

export const getMotebehovUrl = (koblingId) => {
  return `${LANDING_URL}/${koblingId}/behov`;
};

export const getHentMotebehovUrl = (fnr, virksomhetsnummer) => {
  return `${MOTEBEHOV_API}?fnr=${fnr}&virksomhetsnummer=${virksomhetsnummer}`;
};

export const getHentBerikSykmeldteUrl = (koblingIder) => {
  return `${SYKMELDTE_URL}/berik?koblingsIder=${koblingIder}`;
};

export const getMoteinnkallelseUrl = (koblingId) => {
  return `${LANDING_URL}/${koblingId}/innkallelse`;
};

export const getReferatUrl = (koblingId) => {
  return `${LANDING_URL}/${koblingId}/referat`;
};

// Breadcrumbs
const dineSykmeldteBreadcrumb = [
  {
    tittel: 'Dine sykmeldte',
    sti: '/sykefravaerarbeidsgiver',
    erKlikkbar: true,
  },
];

export const dialogmoteBreadcrumb = (sykmeldt) => {
  return [
    ...dineSykmeldteBreadcrumb,
    {
      tittel: `${sykmeldt.navn}`,
      sti: `/sykefravaerarbeidsgiver/${sykmeldt.koblingId}`,
      erKlikkbar: true,
    },
    {
      tittel: 'Dialogmøter',
      sti: `/${sykmeldt.koblingId}/`,
      erKlikkbar: true,
    },
  ];
};

export const innkallelseBreadcrumb = (title, sykmeldt) => [
  ...dialogmoteBreadcrumb(sykmeldt),
  {
    tittel: title,
    sti: getMoteinnkallelseUrl(sykmeldt.koblingId),
    erKlikkbar: true,
  },
];
export const referatBreadcrumb = (sykmeldt) => [
  ...dialogmoteBreadcrumb(sykmeldt),
  {
    tittel: 'Referat fra dialogmøte',
    sti: getReferatUrl(sykmeldt.koblingId),
    erKlikkbar: true,
  },
];
