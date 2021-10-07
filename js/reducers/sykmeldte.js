import * as actiontyper from '../actions/actiontyper';

const initiellState = {
  henter: false,
  hentet: false,
  hentingFeilet: false,
  data: [],
};

export default function sykmeldte(state = initiellState, action = {}) {
  switch (action.type) {
    case actiontyper.SYKMELDTE_HENTET:
      return {
        ...state,
        data: action.sykmeldte,
        henter: false,
        hentet: true,
        hentingFeilet: false,
      };
    case actiontyper.HENTER_SYKMELDTE:
      return {
        ...state,
        data: [],
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    case actiontyper.HENT_SYKMELDTE_FEILET:
      return {
        ...state,
        data: [],
        henter: false,
        hentingFeilet: true,
        hentet: true,
      };
    default:
      return state;
  }
}
