import { toggleErPaaHeroku } from '@/toggles';
import { API_NAVN, hentSyfoApiUrl } from '@/api/apiUtils';

export const ISDIALOGMOTE_PROXY_BASE_PATH = `/dialogmotearbeidsgiver/api/v1/narmesteleder/brev`;
export const MOTEBEHOV_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/motebehov`;
export const MOTEADMIN_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN)}/bruker/arbeidsgiver/moter`;
export const SYKMELDTE_URL = `/dialogmotearbeidsgiver/api/dinesykmeldte`;

export const LANDING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}`;

// Statiske URLer
export const statiskeURLer = {
  KONTAKT_INFO_URL: 'https://arbeidsgiver.nav.no/kontakt-oss/',
  PERSONVERN_URL: 'http://www.nav.no/personvern',
  DIALOGMOTE_INFO_URL:
    'https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/slik-folger-du-opp-sykmeldte/dialogmote-2-og-3-nav_kap',
};

export const getOppfolgingsplanerUrl = (narmestelederId) => {
  const oppfolgingsplanerPath = `${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/${narmestelederId}/oppfolgingsplaner`;
  return toggleErPaaHeroku()
    ? `https://oppfolgingsplanarbeidsgiver.herokuapp.com${oppfolgingsplanerPath}`
    : oppfolgingsplanerPath;
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

export const getSykmeldtPaDatoUrl = (narmesteLederId, dato) => {
  return `${SYKMELDTE_URL}/${narmesteLederId}/${dato}`;
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
    sti: '/sykefravaerarbeidsgiver',
    erKlikkbar: true,
  },
];

export const dialogmoteBreadcrumb = (sykmeldt) => {
  return [
    ...dineSykmeldteBreadcrumb,
    {
      tittel: `${sykmeldt.navn}`,
      sti: `/sykefravaerarbeidsgiver/${sykmeldt.narmestelederId}`,
      erKlikkbar: true,
    },
    {
      tittel: 'Dialogmøter',
      sti: `/${sykmeldt.narmestelederId}/`,
      erKlikkbar: true,
    },
  ];
};

export const innkallelseBreadcrumb = (title, sykmeldt) => [
  ...dialogmoteBreadcrumb(sykmeldt),
  {
    tittel: title,
    sti: getMoteinnkallelseUrl(sykmeldt.narmestelederId),
    erKlikkbar: true,
  },
];
export const referatBreadcrumb = (sykmeldt) => [
  ...dialogmoteBreadcrumb(sykmeldt),
  {
    tittel: 'Referat fra dialogmøte',
    sti: getReferatUrl(sykmeldt.narmestelederId),
    erKlikkbar: true,
  },
];
