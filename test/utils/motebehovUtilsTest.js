import chai from 'chai';
import sinon from 'sinon';
import {
    manglerMotebehovSvar,
    skalViseMotebehovForSykmeldt,
    MOTEBEHOV_SKJEMATYPE,
} from '../../js/utils/motebehovUtils';

const expect = chai.expect;

describe('motebehovUtils', () => {
    describe('skalViseMotebehovForSykmeldt', () => {
        let clock;
        let motebehovReducer;
        beforeEach(() => {
            const dagensDato = new Date('2019-06-11');
            clock = sinon.useFakeTimers(dagensDato.getTime());
        });

        afterEach(() => {
            clock.restore();
        });

        it('skal returnere false, henting av motebehov er forbudt fra syfomotebehov', () => {
            motebehovReducer = {
                hentingForbudt: true,
            };
            expect(skalViseMotebehovForSykmeldt(motebehovReducer)).to.equal(false);
        });

        it('skal returnere false, om visMotebehov er false', () => {
            motebehovReducer = {
                data: {
                    visMotebehov: false,
                    skjemaType: null,
                    motebehov: null,
                },
            };
            expect(skalViseMotebehovForSykmeldt(motebehovReducer)).to.equal(false);
        });

        it('skal returnere false, om visMotebehov er true og skjemaType!=SVAR_BEHOV og skjemaType!=MELD_BEHOV', () => {
            motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: null,
                    motebehov: null,
                },
            };
            expect(skalViseMotebehovForSykmeldt(motebehovReducer)).to.equal(false);
        });

        xit('skal returnere true, om visMotebehov er true og skjemaType=MELD_BEHOV', () => {
            motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: MOTEBEHOV_SKJEMATYPE.MELD_BEHOV,
                    motebehov: null,
                },
            };
            expect(skalViseMotebehovForSykmeldt(motebehovReducer)).to.equal(true);
        });

        it('skal returnere true, om visMotebehov er true og skjemaType=SVAR_BEHOV', () => {
            motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV,
                    motebehov: null,
                },
            };
            expect(skalViseMotebehovForSykmeldt(motebehovReducer)).to.equal(true);
        });
    });

    describe('manglerMotebehovSvarBehovDialogmote2', () => {
        const motebehovSvar = {
            harMotebehov: true,
        };

        it('skal returnere false dersom henting av motebehov feilet', () => {
            const motebehovReducer = {
                hentingFeilet: true,
            };

            const resultat = manglerMotebehovSvar(motebehovReducer);
            const forventet = false;

            expect(resultat).to.equal(forventet);
        });

        it('skal returnere false, om visMotevehov = false', () => {
            const motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV,
                    motebehov: {
                        opprettetDato: new Date(),
                        aktorId: 'sykmeldtAktorId',
                        opprettetAv: 'veilederAktorId',
                        motebehovSvar,
                    },
                },
            };

            const resultat = manglerMotebehovSvar(motebehovReducer);
            const forventet = false;
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere false, om visMotevehov=true, skjemaType!=SVAR_BEHOV med motebehovSvar', () => {
            const motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: 'MELD_BEHOV',
                    motebehov: {
                        opprettetDato: new Date(),
                        aktorId: 'sykmeldtAktorId',
                        opprettetAv: 'veilederAktorId',
                        motebehovSvar,
                    },
                },
            };

            const resultat = manglerMotebehovSvar(motebehovReducer);
            const forventet = false;
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere false, om visMotevehov=true, skjemaType=SVAR_BEHOV med motebehovSvar', () => {
            const motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV,
                    motebehov: {
                        opprettetDato: new Date(),
                        aktorId: 'sykmeldtAktorId',
                        opprettetAv: 'veilederAktorId',
                        motebehovSvar,
                    },
                },
            };

            const resultat = manglerMotebehovSvar(motebehovReducer);
            const forventet = false;
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere true, om visMotevehov=true, skjemaType=SVAR_BEHOV uten motebehovSvar', () => {
            const motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV,
                    motebehov: null,
                },
            };

            const resultat = manglerMotebehovSvar(motebehovReducer);
            const forventet = true;
            expect(resultat).to.equal(forventet);
        });
    });
});
