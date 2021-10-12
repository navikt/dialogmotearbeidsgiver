import * as actiontyper from './actiontyper';

export function henterSykmeldte() {
  return {
    type: actiontyper.HENTER_SYKMELDTE,
  };
}

export function sykmeldteHentet(sykmeldte) {
  return {
    type: actiontyper.SYKMELDTE_HENTET,
    sykmeldte,
  };
}

export function hentSykmeldteFeilet() {
  return {
    type: actiontyper.HENT_SYKMELDTE_FEILET,
  };
}

export function hentSykmeldte(narmestelederId) {
  return {
    type: actiontyper.HENT_SYKMELDTE_FORESPURT,
    narmestelederId,
  };
}
