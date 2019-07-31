/* eslint arrow-body-style:["error", "as-needed"] */

import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sykmeldinger, { selectAlleSykmeldinger } from './sykmeldinger';
import getSykmelding from '../../../test/mock/mockSykmeldinger';
import getSykmeldt from '../../../test/mock/mockSykmeldt';
import { sykmeldteHentet } from '../../actions/sykmeldte_actions';
import { henterSykmeldinger, hentSykmeldingerFeilet, sykmeldingerHentet } from './sykmeldinger_actions';

describe('sykmeldinger', () => {
    let initialState = sykmeldinger();

    it('håndterer SYKMELDTE_HENTET', () => {
        const action = sykmeldteHentet([getSykmeldt({ navn: 'Ole', koblingId: 1 }), getSykmeldt({ navn: 'Per', koblingId: 2 })]);
        const nextState = sykmeldinger(deepFreeze({}), action);

        expect(nextState)
            .to
            .deep
            .equal({
                1: {
                    data: [],
                    hentet: false,
                    henter: false,
                    hentingFeilet: false,
                },
                2: {
                    data: [],
                    hentet: false,
                    henter: false,
                    hentingFeilet: false,
                },
            });
    });

    it('håndterer SYKMELDTE_HENTET når det allerede finnes data', () => {
        const action = sykmeldteHentet([getSykmeldt({ navn: 'Ole', koblingId: 1 }), getSykmeldt({ navn: 'Per', koblingId: 2 })]);
        const state = {
            1: {
                data: [{}, {}],
                hentet: true,
                henter: false,
                hentingFeilet: false,
            },
        };
        const nextState = sykmeldinger(deepFreeze(state), action);

        expect(nextState)
            .to
            .deep
            .equal({
                1: {
                    data: [{}, {}],
                    hentet: true,
                    henter: false,
                    hentingFeilet: false,
                },
                2: {
                    data: [],
                    hentet: false,
                    henter: false,
                    hentingFeilet: false,
                },
            });
    });

    it('håndterer SYKMELDINGER_HENTET når det ikke finnes sykmeldinger for noen før', () => {
        const action = sykmeldingerHentet([getSykmelding({ id: '1' }), getSykmelding({ id: '2' })], '123');
        const nextState = sykmeldinger(initialState, action);

        expect(nextState)
            .to
            .deep
            .equal({
                123: {
                    data: [getSykmelding({ id: '1' }), getSykmelding({ id: '2' })],
                    henter: false,
                    hentingFeilet: false,
                    hentet: true,
                },
            });
    });

    it('håndterer SYKMELDINGER_HENTET når det finnes sykmeldinger for en annen bruker fra før', () => {
        initialState = {
            123: {
                data: [getSykmelding({ id: '1' }), getSykmelding({ id: '2' })],
                henter: false,
                hentingFeilet: false,
                hentet: true,
            },
        };
        const action = sykmeldingerHentet([getSykmelding({ id: '3' }), getSykmelding({ id: '4' })], '456');
        const nextState = sykmeldinger(initialState, action);
        expect(nextState)
            .to
            .deep
            .equal({
                123: {
                    data: [getSykmelding({ id: '1' }), getSykmelding({ id: '2' })],
                    henter: false,
                    hentingFeilet: false,
                    hentet: true,
                },
                456: {
                    data: [getSykmelding({ id: '3' }), getSykmelding({ id: '4' })],
                    henter: false,
                    hentingFeilet: false,
                    hentet: true,
                },
            });
    });

    it('håndterer SYKMELDINGER_HENTET når det finnes sykmeldinger for denne brukeren fra før', () => {
        initialState = {
            123: {
                data: [getSykmelding({ id: '1' }), getSykmelding({ id: '2' })],
                henter: false,
                hentingFeilet: false,
                hentet: true,
            },
        };
        const action = sykmeldingerHentet([getSykmelding({ id: '3' }), getSykmelding({ id: '4' })], '123');
        const nextState = sykmeldinger(initialState, action);
        expect(nextState)
            .to
            .deep
            .equal({
                123: {
                    data: [getSykmelding({ id: '3' }), getSykmelding({ id: '4' })],
                    henter: false,
                    hentingFeilet: false,
                    hentet: true,
                },
            });
    });

    it('håndterer HENTER_SYKMELDINGER', () => {
        initialState = deepFreeze({});
        const action = henterSykmeldinger('123');
        const nextState = sykmeldinger(initialState, action);
        expect(nextState)
            .to
            .deep
            .equal({
                123: {
                    data: [],
                    henter: true,
                    hentingFeilet: false,
                    hentet: false,
                },
            });
    });

    it('håndterer HENT_SYKMELDINGER_FEILET', () => {
        initialState = deepFreeze({});

        const action = hentSykmeldingerFeilet('123');
        const nextState = sykmeldinger(initialState, action);
        expect(nextState)
            .to
            .deep
            .equal({
                123: {
                    data: [],
                    henter: false,
                    hentingFeilet: true,
                    tilgangFeilet: false,
                    hentet: true,
                },
            });
    });

    it('håndterer HENT_SYKMELDINGER_FEILET ved 403-feil', () => {
        initialState = deepFreeze({});

        const action = hentSykmeldingerFeilet('123', '403');
        const nextState = sykmeldinger(initialState, action);
        expect(nextState)
            .to
            .deep
            .equal({
                123: {
                    data: [],
                    henter: false,
                    hentingFeilet: true,
                    tilgangFeilet: true,
                    hentet: true,
                },
            });
    });

    it('Skal ikke wipe sykmeldte dersom henting av sykmeldinger har feilet før sykmeldte er hentet', () => {
        const initState = deepFreeze(sykmeldinger());
        const action1 = henterSykmeldinger(30270);
        const nyState1 = sykmeldinger(initState, action1);
        const action3 = hentSykmeldingerFeilet(30270);
        const nyState3 = sykmeldinger(nyState1, action3);
        const action4 = sykmeldteHentet([{ fnr: '', aktoerId: '123456', orgnummer: '123456', koblingId: 30368, navn: null }]);
        const nyState4 = sykmeldinger(nyState3, action4);
        expect(nyState4['30270'])
            .to
            .deep
            .equal({
                hentingFeilet: true,
                henter: false,
                hentet: true,
                tilgangFeilet: false,
                data: [],
            });
    });

    it('Skal ikke wipe sykmeldte dersom henting av sykmeldinger er vellykket før sykmeldte er hentet', () => {
        const initState = deepFreeze(sykmeldinger());
        const action1 = henterSykmeldinger(30270);
        const nyState1 = sykmeldinger(initState, action1);
        const action3 = sykmeldingerHentet([], 30270);
        const nyState3 = sykmeldinger(nyState1, action3);
        const action4 = sykmeldteHentet([{ fnr: '', aktoerId: '123456', orgnummer: '123456', koblingId: 30368, navn: null }]);
        const nyState4 = sykmeldinger(nyState3, action4);
        expect(nyState4['30270'])
            .to
            .deep
            .equal({
                hentingFeilet: false,
                henter: false,
                hentet: true,
                data: [],
            });
        expect(nyState4['30368'])
            .to
            .deep
            .equal({
                hentingFeilet: false,
                henter: false,
                hentet: false,
                data: [],
            });
    });

    describe('selectors', () => {
        const soknader = [
            getSykmelding({ id: '1' }),
            getSykmelding({ id: '2' }),
            getSykmelding({ id: '3' }),
            getSykmelding({ id: '4' }),
            getSykmelding({ id: '5' }),
            getSykmelding({ id: '6' }),
        ];

        const genererSoknadState = (state = {}) =>
            Object.assign({}, {
                henter: false,
                hentingFeilet: false,
                hentet: true,
                data: [],
            }, state);

        it('skal gi tom liste man ber om alle søknader hvis det ikke finnes noen søknader', () => {
            const state = {
                sykmeldinger: {
                    1: genererSoknadState(),
                    2: genererSoknadState(),
                    3: genererSoknadState(),
                    4: genererSoknadState(),
                    5: genererSoknadState(),
                    6: genererSoknadState(),
                },
            };

            const actual = selectAlleSykmeldinger(state);

            expect(actual)
                .to
                .deep
                .equal([]);
        });

        it('skal gi liste med det den fant om man ber om alle søknader hvis noen ikke er hentet eller har feilet', () => {
            const state = {
                sykmeldinger: {
                    1: genererSoknadState({ henter: true, hentet: false }),
                    2: genererSoknadState({ data: soknader[0] }),
                    3: genererSoknadState({ hentingFeilet: true, hentet: false }),
                    4: genererSoknadState({ data: soknader[1] }),
                    5: genererSoknadState(),
                    6: genererSoknadState(),
                },
            };

            const actual = selectAlleSykmeldinger(state);

            expect(actual)
                .to
                .deep
                .equal([soknader[0], soknader[1]]);
        });

        it('skal kunne hente alle sykmeldinger for alle koblingsider', () => {
            const state = {
                sykmeldinger: {
                    1: genererSoknadState(),
                    2: genererSoknadState({ data: [soknader[0], soknader[1]] }),
                    3: genererSoknadState(),
                    4: genererSoknadState({ data: [soknader[2], soknader[3], soknader[4]] }),
                    5: genererSoknadState({ data: [soknader[5]] }),
                    6: genererSoknadState(),
                },
            };

            const actual = selectAlleSykmeldinger(state);

            expect(actual)
                .to
                .deep
                .equal(soknader);
        });
    });
});
