import { expect } from 'chai';
import sinon from 'sinon';
import deepFreeze from 'deep-freeze';
import * as actions from '../../js/actions/motebehov_actions';
import motebehov, { getReducerKey } from '../../js/reducers/motebehov';
import { leggTilDagerPaaDato } from '../../js/utils/datoUtils';

describe('motebehov', () => {
    const initState = deepFreeze({});

    const MOTEBEHOVSVAR_GYLDIG_VARIGHET_DAGER = 10 * 7;

    let sykmeldt;
    let fnr;
    let orgnummer;
    let reducerKey;
    let clock;
    beforeEach(() => {
        const dagensDato = new Date('2019-02-23');
        clock = sinon.useFakeTimers(dagensDato.getTime());
        sykmeldt = {
            fnr: '1234',
            orgnummer: '1234',
        };
        fnr = sykmeldt.fnr;
        orgnummer = sykmeldt.orgnummer;
        reducerKey = getReducerKey(fnr, orgnummer);
    });

    afterEach(() => {
        clock.restore();
    });

    it('håndterer HENT_MOTEBEHOV_HENTER', () => {
        const action = actions.hentMotebehovHenter(fnr, orgnummer);
        const nextState = motebehov(initState, action);
        expect(nextState).to.deep.equal({
            [reducerKey]: {
                henter: true,
                hentet: false,
                hentingFeilet: false,
                hentingForbudt: false,
                hentingForsokt: false,
                data: [],
            },
        });
    });

    it('håndterer HENT_MOTEBEHOV_HENTET', () => {
        const opprettetDato = leggTilDagerPaaDato(new Date(), -MOTEBEHOVSVAR_GYLDIG_VARIGHET_DAGER);
        const action = actions.hentMotebehovHentet(
            [{
                opprettetDato,
                motebehovSvar: {},
            }],
            fnr,
            orgnummer,
        );
        const nextState = motebehov(initState, action);

        expect(nextState).to.deep.equal({
            [reducerKey]: {
                henter: false,
                hentet: true,
                hentingFeilet: false,
                hentingForbudt: false,
                hentingForsokt: true,
                data: [{
                    opprettetDato,
                    motebehovSvar: {},
                }],
            },
        });
    });

    it('håndterer HENT_MOTEBEHOV_FEILET', () => {
        const action = actions.hentMotebehovFeilet(fnr, orgnummer);
        const nextState = motebehov(initState, action);
        expect(nextState).to.deep.equal({
            [reducerKey]: {
                henter: false,
                hentet: false,
                hentingFeilet: true,
                hentingForbudt: false,
                hentingForsokt: true,
                data: [],
            },
        });
    });

    it('håndterer HENT_MOTEBEHOV_FORBUDT', () => {
        const action = actions.hentMotebehovForbudt(fnr, orgnummer);
        const nextState = motebehov(initState, action);
        expect(nextState).to.deep.equal({
            [reducerKey]: {
                henter: false,
                hentet: false,
                hentingFeilet: false,
                hentingForbudt: true,
                hentingForsokt: true,
                data: [],
            },
        });
    });

    it('håndterer SVAR_MOTEBEHOV_SENDT', () => {
        const opprettetDato = leggTilDagerPaaDato(new Date(), -MOTEBEHOVSVAR_GYLDIG_VARIGHET_DAGER);
        const action = actions.svarMotebehovSendt(
            {
                opprettetDato,
                motebehovSvar: {
                    forklaring: 'forkaling',
                },
            },
            fnr,
            orgnummer,
        );
        const nextState = motebehov(initState, action);
        expect(nextState[reducerKey].data).to.have.length(1);
        expect(nextState[reducerKey].data[0].motebehovSvar).to.deep.equal({
            forklaring: 'forkaling',
        });
    });
});
