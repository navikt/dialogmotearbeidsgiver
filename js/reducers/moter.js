import {
    MOTER_HENTET,
    HENTER_MOTER,
    HENT_MOTER_FEILET,
    SVAR_SENDT,
} from '../actions/moter_actions';
import { konverterTid } from '../utils/moteplanleggerUtils';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    hentingForsokt: false,
    data: [],
};

export default function moter(state = initiellState, action = {}) {
    switch (action.type) {
        case MOTER_HENTET:
            return {
                ...state,
                data: action.data.map(konverterTid),
                henter: false,
                hentet: true,
                hentingFeilet: false,
                hentingForsokt: true,
            };
        case HENTER_MOTER:
            return {
                ...state,
                henter: true,
                hentet: false,
                hentingFeilet: false,
                hentingForsokt: false,
            };
        case HENT_MOTER_FEILET:
            return {
                ...state,
                henter: false,
                hentet: true,
                hentingFeilet: true,
                hentingForsokt: true,
            };
        case SVAR_SENDT: {
            const data = state.data.map((m) => {
                if (m.moteUuid !== action.moteUuid) {
                    return m;
                }
                return {
                    ...m,
                    deltakere: m.deltakere.map((d) => {
                        if (d.type !== action.deltakertype) {
                            return d;
                        }
                        return {
                            ...d,
                            svar: d.svar.map((s) => {
                                if (action.data.includes(s.id)) {
                                    return {
                                        ...s,
                                        valgt: true,
                                    };
                                }
                                return s;
                            }),
                            svartidspunkt: new Date(),
                        };
                    }),
                };
            });
            return { ...state, data };
        }
        default:
            return state;
    }
}
