import { expect } from 'chai';
import sinon from 'sinon';
import deepFreeze from 'deep-freeze';
import * as actions from '../../js/actions/motebehov_actions';
import motebehovSvar from '../../js/reducers/motebehovSvar';
import { getReducerKey } from '../../js/reducers/motebehov';

describe('motebehovSvar', () => {
    const initState = deepFreeze({});

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

    it('håndterer SVAR_MOTEBEHOV_HENTER', () => {
        const action = actions.svarMotebehovSender(fnr, orgnummer);
        const nextState = motebehovSvar(initState, action);
        expect(nextState).to.deep.equal({
            [reducerKey]: {
                sender: true,
                sendt: false,
                sendingFeilet: false,
            },
        });
    });

    it('håndterer SVAR_MOTEBEHOV_HENTET', () => {
        const action = actions.svarMotebehovSendt(
            {
                opprettetDato: new Date(),
                motebehovSvar: {},
            },
            fnr,
            orgnummer,
        );
        const nextState = motebehovSvar(initState, action);

        expect(nextState).to.deep.equal({
            [reducerKey]: {
                sender: false,
                sendt: true,
                sendingFeilet: false,
            },
        });
    });

    it('håndterer SVAR_MOTEBEHOV_FEILET', () => {
        const action = actions.svarMotebehovFeilet(fnr, orgnummer);
        const nextState = motebehovSvar(initState, action);
        expect(nextState).to.deep.equal({
            [reducerKey]: {
                sender: false,
                sendt: false,
                sendingFeilet: true,
            },
        });
    });
});
