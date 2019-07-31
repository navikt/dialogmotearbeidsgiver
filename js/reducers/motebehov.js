import {
    HENT_MOTEBEHOV_HENTER,
    HENT_MOTEBEHOV_HENTET,
    HENT_MOTEBEHOV_FEILET,
    HENT_MOTEBEHOV_FORBUDT,
    SVAR_MOTEBEHOV_SENDT,
} from '../actions/motebehov_actions';

const initiellState = {};

export const sorterMotebehovEtterNyeste = (motebehovListe) => {
    return [...motebehovListe].sort((t1, t2) => {
        return t2.opprettetDato - t1.opprettetDato;
    });
};

export const getReducerKey = (fnr, virksomhetsnummer) => {
    return `${fnr}-${virksomhetsnummer}`;
};

export default function motebehov(state = initiellState, action = {}) {
    const sykmeldt = {};
    const reducerKey = getReducerKey(action.fnr, action.virksomhetsnummer);
    switch (action.type) {
        case HENT_MOTEBEHOV_HENTER:
            sykmeldt[reducerKey] = {
                henter: true,
                hentet: false,
                hentingFeilet: false,
                hentingForbudt: false,
                hentingForsokt: false,
                data: state[reducerKey]
                    ? state[reducerKey].data
                    : [],
            };
            return { ...state, ...sykmeldt };
        case HENT_MOTEBEHOV_HENTET:
            sykmeldt[reducerKey] = {
                henter: false,
                hentet: true,
                hentingFeilet: false,
                hentingForbudt: false,
                hentingForsokt: true,
                data: action.data.length > 0
                    ? sorterMotebehovEtterNyeste(action.data)
                    : [],
            };
            return { ...state, ...sykmeldt };
        case HENT_MOTEBEHOV_FEILET:
            sykmeldt[reducerKey] = {
                henter: false,
                hentet: false,
                hentingFeilet: true,
                hentingForbudt: false,
                hentingForsokt: true,
                data: state[reducerKey]
                    ? state[reducerKey].data
                    : [],
            };
            return { ...state, ...sykmeldt };
        case HENT_MOTEBEHOV_FORBUDT:
            sykmeldt[reducerKey] = {
                henter: false,
                hentet: false,
                hentingFeilet: false,
                hentingForbudt: true,
                hentingForsokt: true,
                data: state[reducerKey]
                    ? state[reducerKey].data
                    : [],
            };
            return { ...state, ...sykmeldt };
        case SVAR_MOTEBEHOV_SENDT: {
            const nyttMotebehov = {
                ...action.svar,
                opprettetDato: new Date(),
            };
            const motebehovListe = state[reducerKey] ? state[reducerKey].data : [];
            sykmeldt[reducerKey] = {
                ...state[reducerKey],
                data: [nyttMotebehov, ...motebehovListe],
            };
            return { ...state, ...sykmeldt };
        }
        default:
            return state;
    }
}
