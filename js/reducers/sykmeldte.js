import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentet: false,
    henterBerikelser: [],
    hentingFeilet: false,
    data: [],
};

export const sykmeldteDataSelector = (state) => {
    return state.sykmeldte.data;
};

export const sykmeldtSelector = (state, koblingId) => {
    return sykmeldteDataSelector(state).find((s) => {
        return `${s.koblingId}` === `${koblingId}`;
    });
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
        case actiontyper.SYKMELDT_SLETTET: {
            const data = state.data.filter((s) => {
                const match = s.orgnummer === action.orgnr && s.fnr === action.fnr;
                return !match;
            });
            return {
                ...state,
                data,
                sletter: false,
                slettet: true,
            };
        }
        case actiontyper.SLETTER_SYKMELDT: {
            return {
                ...state,
                sletter: true,
                slettet: false,
                slettingFeilet: false,
            };
        }
        case actiontyper.SLETT_SYKMELDT_FEILET: {
            return {
                ...state,
                sletter: false,
                slettingFeilet: true,
            };
        }
        case actiontyper.SET_SYKMELDTE_SORTERING: {
            const sortering = state.sortering
                ? {
                    ...state.sortering,
                    [action.sykmeldtetype]: action.sorteringsfelt,
                }
                : {
                    [action.sykmeldtetype]: action.sorteringsfelt,
                };
            return {
                ...state,
                sortering,
            };
        }
        case actiontyper.HENTER_SYKMELDTE_BERIKELSER: {
            const henterBerikelserUtenDuplikater = [
                ...state.henterBerikelser,
                ...action.koblingIder,
            ].filter((koblingId, index, self) => {
                return self.indexOf(koblingId) === index;
            }).map((koblingId) => {
                return parseInt(koblingId, 10);
            });
            return {
                ...state,
                henterBerikelser: henterBerikelserUtenDuplikater,
            };
        }
        case actiontyper.HENT_SYKMELDTE_BERIKELSER_FEILET: {
            return {
                ...state,
                henterBerikelser: state.henterBerikelser.filter((koblingId) => {
                    return action.koblingIder.indexOf(koblingId) === -1;
                }),
                hentingFeilet: true,
            };
        }
        case actiontyper.SYKMELDTE_BERIKELSER_HENTET: {
            return {
                ...state,
                henterBerikelser: state.henterBerikelser.filter((koblingId) => {
                    return action.koblingIder.indexOf(koblingId) === -1;
                }),
                data: state.data.map((s) => {
                    const berikelse = action.berikelser.find((k) => {
                        return k.koblingId === s.koblingId;
                    });
                    const r = {
                        ...s,
                        ...berikelse,
                    };
                    return r;
                }),
            };
        }
        default:
            return state;
    }
}
