import {
    SVAR_MOTEBEHOV_SENDER,
    SVAR_MOTEBEHOV_SENDT,
    SVAR_MOTEBEHOV_FEILET,
} from '../actions/motebehov_actions';
import { getReducerKey } from './motebehov';

const initiellState = {};

export default function motebehovSvar(state = initiellState, action = {}) {
    const sykmeldt = {};
    const reducerKey = getReducerKey(action.fnr, action.virksomhetsnummer);
    switch (action.type) {
        case SVAR_MOTEBEHOV_SENDER:
            sykmeldt[reducerKey] = {
                sender: true,
                sendt: false,
                sendingFeilet: false,
            };
            return { ...state, ...sykmeldt };
        case SVAR_MOTEBEHOV_SENDT:
            sykmeldt[reducerKey] = {
                sender: false,
                sendt: true,
                sendingFeilet: false,
            };
            return { ...state, ...sykmeldt };
        case SVAR_MOTEBEHOV_FEILET:
            sykmeldt[reducerKey] = {
                sender: false,
                sendt: false,
                sendingFeilet: true,
            };
            return { ...state, ...sykmeldt };
        default:
            return state;
    }
}
