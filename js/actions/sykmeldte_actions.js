import * as actiontyper from './actiontyper';

export function henterSykmeldte() {
  return {
    type: actiontyper.HENTER_SYKMELDTE,
  };
}

export function sykmeldteHentet(sykmeldte = []) {
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

export function hentSykmeldte() {
  return {
    type: actiontyper.HENT_SYKMELDTE_FORESPURT,
  };
}

export const hentSykmeldteBerikelser = (koblingIder) => {
  return {
    type: actiontyper.HENT_SYKMELDTE_BERIKELSER_FORESPURT,
    koblingIder,
  };
};

export const henterSykmeldteBerikelser = (koblingIder) => {
  return {
    type: actiontyper.HENTER_SYKMELDTE_BERIKELSER,
    koblingIder,
  };
};

export const hentSykmeldteBerikelserFeilet = (koblingIder) => {
  return {
    type: actiontyper.HENT_SYKMELDTE_BERIKELSER_FEILET,
    koblingIder,
  };
};

export const sykmeldteBerikelserHentet = (berikelser, koblingIder) => {
  return {
    type: actiontyper.SYKMELDTE_BERIKELSER_HENTET,
    berikelser,
    koblingIder,
  };
};
