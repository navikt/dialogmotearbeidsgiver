import { API_NAVN, hentSyfoApiUrl } from '../../gateway-api/gatewayApi';

export const LANDING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}`;

export const ISDIALOGMOTE_API_BASE_PATH = `/dialogmote/api/v1/narmesteleder/brev`;
export const MOTEBEHOV_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/motebehov`;
export const MOTEADMIN_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN)}/bruker/arbeidsgiver/moter`;

export const MOTEBEHOV_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/:koblingId/behov`;

export const OPPFOLGINGSPLANER_URL = `${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/:koblingId/oppfolgingsplaner`;

// Breadcrumbs
const dineSykmeldteBreadcrumb = [
  {
    tittel: 'Dine sykmeldte',
    sti: '/sykefravaerarbeidsgiver',
    erKlikkbar: true,
  },
];

export const dialogmoteBreadcrumb = [
  ...dineSykmeldteBreadcrumb,
  /* TODO: eksisterende er:
  * {
        tittel: sykmeldt ? sykmeldt.navn : '',
        sti: sykmeldt ? `/sykefravaerarbeidsgiver/${sykmeldt.koblingId}` : '/',
        erKlikkbar: true,
      },
      {
        tittel: 'Dialogmøter',
      },
  * */
];
