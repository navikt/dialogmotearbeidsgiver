import { API_NAVN, hentSyfoApiUrl } from '../../gateway-api';

export const LANDING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}`;

export const ISDIALOGMOTE_API_BASE_PATH = `/dialogmote/api/v1/narmesteleder/brev`;
export const MOTEBEHOV_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/motebehov`;
export const MOTEADMIN_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN)}/bruker/arbeidsgiver/moter`;

export const SYKMELDTE_URL = `${process.env.REACT_APP_SYFOREST_ROOT}/arbeidsgiver/sykmeldte`;

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
