import { API_NAVN, hentSyfoApiUrl } from '../../gateway-api';

export const LANDING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}`;

export const ISDIALOGMOTE_API_BASE_PATH = `/dialogmote/api/v1/narmesteleder/brev`;
export const MOTEBEHOV_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/motebehov`;
export const MOTEADMIN_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN)}/bruker/arbeidsgiver/moter`;

export const SYKMELDTE_URL = `${process.env.REACT_APP_SYFOREST_ROOT}/arbeidsgiver/sykmeldte`;

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
  return `${LANDING_URL}/${koblingId}/moteinnkallelse`;
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
      sti: `/${sykmeldt.koblingId}`,
      erKlikkbar: true,
    },
    {
      tittel: 'Dialogmøter',
    },
  ];
};

export const innkallelseBreadcrumb = (koblingId) => [
  ...dialogmoteBreadcrumb,
  {
    tittel: 'Referat fra dialogmøte',
    sti: getMoteinnkallelseUrl(koblingId),
    erKlikkbar: true,
  },
];

export const referatBreadcrumb = (title, koblingId) => [
  ...dialogmoteBreadcrumb,
  {
    tittel: title,
    sti: getReferatUrl(koblingId),
    erKlikkbar: true,
  },
];
