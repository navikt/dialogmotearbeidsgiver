import chai from 'chai';
import sinon from 'sinon';
import {
    manglerArbeidsgiversSvar,
    harMote,
    getMote,
    skalViseMotebehovForSykmeldt,
    manglerMotebehovSvarBehovDialogmote2,
} from '../../js/utils/moteUtils';
import { MOTEBEHOV_SKJEMATYPE } from '../../js/utils/motebehovUtils';

const expect = chai.expect;

describe('moteUtils', () => {
    describe('harMote', () => {
        it('Returnerer true hvis sykmeldt har møte', () => {
            const state = {
                moter: {
                    data: [{ fnr: '123' }],
                },
            };
            expect(harMote(state, '123')).to.be.equal(true);
        });
        it('Returnerer false hvis sykmeldt ikke har møte', () => {
            const state = {
                moter: {
                    data: [{ fnr: '321' }],
                },
            };
            expect(harMote(state, '123')).to.be.equal(false);
        });
    });

    describe('manglerArbeidsgiversSvar', () => {
        it('Ingen mote gir false', () => {
            expect(manglerArbeidsgiversSvar([], 'fnr')).to.be.equal(false);
        });

        it('Kun BEKREFTET mote gir false', () => {
            const mote = {
                fnr: 'fnr',
                status: 'BEKREFTET',
            };
            expect(manglerArbeidsgiversSvar([mote], 'fnr')).to.be.equal(false);
        });

        it('gir true dersom opprettet mote som arbeidsgiver ikke har svar på', () => {
            const mote = {
                fnr: 'fnr',
                status: 'OPPRETTET',
                deltakere: [{
                    type: 'arbeidsgiver',
                    svartidspunkt: null,
                }],
                alternativer: [{
                    created: new Date('2017-08-14'),
                }],

            };
            expect(manglerArbeidsgiversSvar([mote], 'fnr')).to.be.equal(true);
        });

        it('gir false dersom opprettet mote som arbeidsgiver har svar på', () => {
            const mote = {
                fnr: 'fnr',
                status: 'OPPRETTET',
                deltakere: [{
                    type: 'arbeidsgiver',
                    svartidspunkt: new Date('2017-08-15'),
                }],
                alternativer: [{
                    created: new Date('2017-08-14'),
                }],

            };
            expect(manglerArbeidsgiversSvar([mote], 'fnr')).to.be.equal(false);
        });

        it('gir true det er kommet nytt tidspunkt', () => {
            const mote = {
                fnr: 'fnr',
                status: 'OPPRETTET',
                deltakere: [{
                    type: 'arbeidsgiver',
                    svartidspunkt: new Date('2017-08-15'),
                }],
                alternativer: [{
                    created: new Date('2017-08-14'),
                }, {
                    created: new Date('2017-08-16'),
                }],

            };
            expect(manglerArbeidsgiversSvar([mote], 'fnr')).to.be.equal(true);
        });
    });

    describe('getMote', () => {
        it('getMote returnerer nyeste motet', () => {
            const intiallMoter = {
                moter: {
                    data: [{
                        moteUuid: 'abc',
                        fnr: 'fnr',
                        opprettetTidspunkt: '2017-03-22T07:31:39.399',
                        deltakere: [
                            {
                                type: 'Bruker',
                                svar: [
                                    {
                                        id: 17,
                                        valgt: false,
                                    },
                                    {
                                        id: 18,
                                        valgt: false,
                                    },
                                ],
                            }, {
                                type: 'arbeidsgiver',
                                svar: [
                                    {
                                        id: 17,
                                        valgt: false,
                                    },
                                    {
                                        id: 18,
                                        valgt: false,
                                    },
                                ],
                            },
                        ],
                    }, {
                        moteUuid: 'cba',
                        fnr: 'fnr',
                        opprettetTidspunkt: '2017-04-22T07:31:39.399',
                        deltakere: [
                            {
                                type: 'Bruker',
                                svar: [
                                    {
                                        id: 17,
                                        valgt: false,
                                    },
                                    {
                                        id: 18,
                                        valgt: false,
                                    },
                                ],
                            }, {
                                type: 'arbeidsgiver',
                                svar: [
                                    {
                                        id: 17,
                                        valgt: false,
                                    },
                                    {
                                        id: 18,
                                        valgt: false,
                                    },
                                ],
                            },
                        ],
                    }],
                    henter: false,
                    hentingFeilet: false,
                },
            };

            const mote = getMote(intiallMoter, 'fnr');
            expect(mote.moteUuid).to.equal('cba');
        });
    });

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

        it('skal returnere false, om visMotebehov er true og skjemaType!=SVAR_BEHOV', () => {
            motebehovReducer = {
                data: {
                    visMotebehov: true,
                    skjemaType: 'MELD_BEHOV',
                    motebehov: null,
                },
            };
            expect(skalViseMotebehovForSykmeldt(motebehovReducer)).to.equal(false);
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

            const resultat = manglerMotebehovSvarBehovDialogmote2(motebehovReducer);
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

            const resultat = manglerMotebehovSvarBehovDialogmote2(motebehovReducer);
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

            const resultat = manglerMotebehovSvarBehovDialogmote2(motebehovReducer);
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

            const resultat = manglerMotebehovSvarBehovDialogmote2(motebehovReducer);
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

            const resultat = manglerMotebehovSvarBehovDialogmote2(motebehovReducer);
            const forventet = true;
            expect(resultat).to.equal(forventet);
        });
    });
});
