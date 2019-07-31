import chai from 'chai';
import deepFreeze from 'deep-freeze';
import * as utils from '../../js/utils/sykmeldtUtils';

const expect = chai.expect;

describe('sykmeldtUtils', () => {
    let state;
    let sykmeldt;

    beforeEach(() => {
        state = {};
        state.sykmeldinger = {};
        sykmeldt = {
            koblingId: 123,
            fnr: '12345678910',
        };
    });

    describe('harSykmeldinger', () => {
        it('Skal returnere true hvis den sykmeldte har sykmeldinger', () => {
            state.sykmeldinger = {
                123: {
                    data: [{}],
                },
            };
            expect(utils.harSykmeldinger(deepFreeze(state), sykmeldt)).to.equal(true);
        });

        it('Skal returnere false hvis den sykmeldte ikke har sykmeldinger', () => {
            state.sykmeldinger = {
                123: {
                    data: [],
                },
            };
            expect(utils.harSykmeldinger(deepFreeze(state), sykmeldt)).to.equal(false);
        });

        it('Skal returnere false hvis det er uvisst om den sykmeldte har sykmeldinger', () => {
            state.sykmeldinger = {
                456: {
                    data: [],
                },
            };
            expect(utils.harSykmeldinger(deepFreeze(state), sykmeldt)).to.equal(false);
        });
    });

    describe('harDialogmote', () => {
        beforeEach(() => {
            state.moter = {};
        });

        it('Skal returnere false hvis møter er tomt', () => {
            state.moter = {
                data: [],
            };
            expect(utils.harDialogmote(deepFreeze(state), sykmeldt)).to.equal(false);
        });

        it('Skal returnere true hvis det finnes møte', () => {
            state.moter = {
                data: [{
                    navn: 'Tore Tang',
                    fnr: '12345678910',
                }],
            };
            expect(utils.harDialogmote(deepFreeze(state), sykmeldt)).to.equal(true);
        });
    });

    describe('harSykepengesoknader', () => {
        it('Skal returnere true om det finnes søknader', () => {
            state.sykepengesoknader = {
                123: {
                    data: [{}],
                },
            };
            expect(utils.harSykepengesoknader(deepFreeze(state), sykmeldt)).to.equal(true);
        });

        it('Skal returnere false om det ikke finnes søknader', () => {
            state.sykepengesoknader = {};
            expect(utils.harSykepengesoknader(deepFreeze(state), sykmeldt)).to.equal(false);
        });
    });

    describe('sykmeldtHarInnhold', () => {
        it('Skal returnere true dersom det skal vises søknader', () => {
            state.sykepengesoknader = {
                123: {
                    data: [{}],
                },
            };
            expect(utils.sykmeldtHarInnhold(deepFreeze(state), sykmeldt)).to.equal(true);
        });

        it('Skal returnere true dersom ikke skal vises noe', () => {
            expect(utils.sykmeldtHarInnhold(deepFreeze(state), sykmeldt)).to.equal(false);
        });
    });
});
