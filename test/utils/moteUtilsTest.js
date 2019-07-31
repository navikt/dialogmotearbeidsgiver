import chai from 'chai';
import sinon from 'sinon';
import {
    manglerArbeidsgiversSvar,
    harMote,
    getMote,
    erOppfoelgingsdatoNyereEnn132DagerForProdsetting,
    erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker,
    skalViseMotebehovForSykmeldt,
    hentNyesteOppfoelgingstilfelleStartdato,
    moteOpprettetIOppfolgingstilfelle,
    manglerMotebehovSvarIOppfolgingstilfelle,
} from '../../js/utils/moteUtils';
import { leggTilDagerPaaDato } from '../mock/testUtils';

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

    describe('erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker', () => {
        let clock;
        let oppfoelgingsdato;
        beforeEach(() => {
            const dagensDato = new Date('2019-02-23');
            clock = sinon.useFakeTimers(dagensDato.getTime());
        });

        afterEach(() => {
            clock.restore();
        });

        it('skal returnere false, dersom dagens dato er mindre enn 16 uker etter start av oppfoelgingsdato', () => {
            oppfoelgingsdato = leggTilDagerPaaDato(new Date(), -((16 * 7) - 1));
            expect(erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(oppfoelgingsdato)).to.equal(false);
        });

        it('skal returnere true, dersom dagens dato er 16 uker etter start av oppfoelgingsdato ', () => {
            oppfoelgingsdato = leggTilDagerPaaDato(new Date(), -(16 * 7));
            expect(erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(oppfoelgingsdato)).to.equal(true);
        });

        it('skal returnere true, dersom dagens dato er mer 16 uker etter start av oppfoelgingsdato ', () => {
            oppfoelgingsdato = leggTilDagerPaaDato(new Date(), -((16 * 7) + 1));
            expect(erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(oppfoelgingsdato)).to.equal(true);
        });

        it('skal returnere true, dersom dagens dato er mer enn 16 uker og mindre enn 26 uker etter start av oppfoelgingsdato ', () => {
            oppfoelgingsdato = leggTilDagerPaaDato(new Date(), -((26 * 7) - 1));
            expect(erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(oppfoelgingsdato)).to.equal(true);
        });

        it('skal returnere false, dersom dagens dato er 26 uker etter start av oppfoelgingsdato', () => {
            oppfoelgingsdato = leggTilDagerPaaDato(new Date(), -(26 * 7));
            expect(erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(oppfoelgingsdato)).to.equal(false);
        });
    });

    describe('skalViseMotebehovForSykmeldt', () => {
        let clock;
        let sykeforloepsPerioder;
        let sykmeldt;
        let motebehovReducer;
        beforeEach(() => {
            const dagensDato = new Date('2019-06-11');
            clock = sinon.useFakeTimers(dagensDato.getTime());
            sykeforloepsPerioder = {};
            sykmeldt = {
                orgnummer: '12345678',
                fnr: '12345678',
            };
        });

        afterEach(() => {
            clock.restore();
        });

        it('skal returnere false, dersom oppfoelgingsdato ikke er passert med 16uker', () => {
            sykeforloepsPerioder = {
                data: {
                    fnr: sykmeldt.fnr,
                    virksomhetsnummer: sykmeldt.orgnummer,
                    periodeListe: [
                        { fom: leggTilDagerPaaDato(new Date(), -((16 * 7) - 1)) },
                    ],
                },
            };
            expect(skalViseMotebehovForSykmeldt(sykmeldt, sykeforloepsPerioder)).to.equal(false);
        });

        it('skal returnere true, dersom oppfoelgingsdato er passert med 16uker', () => {
            sykeforloepsPerioder = {
                data: {
                    fnr: sykmeldt.fnr,
                    virksomhetsnummer: sykmeldt.orgnummer,
                    periodeListe: [
                        { fom: leggTilDagerPaaDato(new Date(), -(16 * 7)) },
                    ],
                },
            };
            motebehovReducer = {};
            const mote = {};
            expect(skalViseMotebehovForSykmeldt(sykmeldt, sykeforloepsPerioder, motebehovReducer, mote)).to.equal(true);
        });

        it('skal returnere true, dersom oppfoelgingsdato er passert med 16 uker og ikke 26 uker', () => {
            sykeforloepsPerioder = {
                data: {
                    fnr: sykmeldt.fnr,
                    virksomhetsnummer: sykmeldt.orgnummer,
                    periodeListe: [
                        { fom: leggTilDagerPaaDato(new Date(), -((26 * 7) - 1)) },
                    ],
                },
            };
            motebehovReducer = {};
            const mote = {};
            expect(skalViseMotebehovForSykmeldt(sykmeldt, sykeforloepsPerioder, motebehovReducer, mote)).to.equal(true);
        });

        it('skal returnere false, dersom oppfoelgingsdato er passert med 16 uker og 26 uker', () => {
            sykeforloepsPerioder = {
                data: {
                    fnr: sykmeldt.fnr,
                    virksomhetsnummer: sykmeldt.orgnummer,
                    periodeListe: [
                        { fom: leggTilDagerPaaDato(new Date(), -(26 * 7)) },
                    ],
                },
            };
            expect(skalViseMotebehovForSykmeldt(sykmeldt, sykeforloepsPerioder)).to.equal(false);
        });

        describe('hentingForbudt', () => {
            it('skal returnere true, dersom oppfoelgingsdato er passert med 16 uker og ikke 26 uker', () => {
                sykeforloepsPerioder = {
                    data: {
                        fnr: sykmeldt.fnr,
                        virksomhetsnummer: sykmeldt.orgnummer,
                        periodeListe: [
                            { fom: leggTilDagerPaaDato(new Date(), -((26 * 7) - 1)) },
                        ],
                    },
                };
                motebehovReducer = {};
                const mote = {};
                expect(skalViseMotebehovForSykmeldt(sykmeldt, sykeforloepsPerioder, motebehovReducer, mote)).to.equal(true);
            });

            it('skal returnere false, henting av motebehov er forbudt fra syfomotebehov', () => {
                sykeforloepsPerioder = {
                    data: {
                        fnr: sykmeldt.fnr,
                        virksomhetsnummer: sykmeldt.orgnummer,
                        periodeListe: [
                            { fom: leggTilDagerPaaDato(new Date(), -((26 * 7) - 1)) },
                        ],
                    },
                };
                motebehovReducer = {
                    hentingForbudt: true,
                };
                expect(skalViseMotebehovForSykmeldt(sykmeldt, sykeforloepsPerioder, motebehovReducer)).to.equal(false);
            });
        });
    });

    describe('erOppfoelgingsdatoNyereEnn132DagerForProdsetting', () => {
        let oppfoelgingsdato;

        it('skal returnere false dersom oppfoelgingsdato ikke er nyere enn 132 dager for prodsetting av motebehov ', () => {
            oppfoelgingsdato = new Date('2018-10-30');
            const resultat = erOppfoelgingsdatoNyereEnn132DagerForProdsetting(oppfoelgingsdato);
            const forventet = false;
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere true dersom oppfoelgingsdato er nyere enn 132 dager for prodsetting av motebehov ', () => {
            oppfoelgingsdato = new Date('2018-10-31');
            const resultat = erOppfoelgingsdatoNyereEnn132DagerForProdsetting(oppfoelgingsdato);
            const forventet = true;
            expect(resultat).to.equal(forventet);
        });
    });

    describe('hentNyesteOppfoelgingstilfelleStartdato', () => {
        let clock;
        let sykmeldt;
        let sykeforloepsPeriode;
        beforeEach(() => {
            const dagensDato = new Date('2019-02-23');
            clock = sinon.useFakeTimers(dagensDato.getTime());
            sykmeldt = {
                orgnummer: '12345678',
                fnr: '12345678',
            };
        });

        afterEach(() => {
            clock.restore();
        });

        it('skal returnere sykeforloepsPeriode med nyeste fom for sykeforloepsPeriode', () => {
            sykeforloepsPeriode = {
                fnr: sykmeldt.fnr,
                virksomhetsnummer: sykmeldt.orgnummer,
                periodeListe: [
                    { fom: '2016-11-01' },
                    { fom: '2016-10-01' },
                    { fom: '2016-12-01' },
                ],
            };
            const resultat = hentNyesteOppfoelgingstilfelleStartdato(sykmeldt, sykeforloepsPeriode).getTime();
            let forventet = new Date(sykeforloepsPeriode.periodeListe[1].fom);
            forventet = forventet.getTime();
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere sykeforloepsPeriode med nyeste fom for sykeforloepsPeriode', () => {
            sykeforloepsPeriode = {
                fnr: sykmeldt.fnr,
                virksomhetsnummer: sykmeldt.orgnummer,
                periodeListe: [
                    { fom: '2016-11-01' },
                    { fom: '2016-12-01' },
                    { fom: '2016-10-01' },
                ],
            };
            const resultat = hentNyesteOppfoelgingstilfelleStartdato(sykmeldt, sykeforloepsPeriode).getTime();
            let forventet = new Date(sykeforloepsPeriode.periodeListe[2].fom);
            forventet = forventet.getTime();
            expect(resultat).to.equal(forventet);
        });
    });

    describe('moteOpprettetIOppfolgingstilfelle', () => {
        const startOppfolgingsdatoString = '2019-01-01';
        const sluttOppfolgingsdatoString = '2019-07-07';
        const datoIOppfolgingsperiode = '2019-05-01';
        const datoForOppfolgingsperiode = '2018-12-01';
        const startOppfolgingsdato = new Date(startOppfolgingsdatoString);
        const sluttOppfolgingsdato = new Date(sluttOppfolgingsdatoString);

        it('skal returnere true dersom motet ble opprettet mellom start og slutt av oppfolgingstilfellet', () => {
            const mote = {
                opprettetTidspunkt: datoIOppfolgingsperiode,
            };

            const resultat = moteOpprettetIOppfolgingstilfelle(mote, startOppfolgingsdato, sluttOppfolgingsdato);
            const forventet = true;
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere false dersom motet ble opprettet for starten av oppfolgingstilfellet', () => {
            const mote = {
                opprettetTidspunkt: datoForOppfolgingsperiode,
            };

            const resultat = moteOpprettetIOppfolgingstilfelle(mote, startOppfolgingsdato, sluttOppfolgingsdato);
            const forventet = false;
            expect(resultat).to.equal(forventet);
        });
    });

    describe('manglerMotebehovSvarIOppfolgingstilfelle', () => {
        const startOppfolgingsdatoString = '2019-01-01';
        const datoIOppfolgingsperiode = '2019-05-01';
        const datoForOppfolgingsperiode = '2018-12-01';

        const sykeforlopsPerioder = {
            data: {
                periodeListe: [
                    {
                        fom: startOppfolgingsdatoString,
                    },
                ],
            },
        };

        const sykmeldt = {
            orgnummer: '12345678',
            fnr: '12345678',
        };

        const motebehovSvar = {
            harMotebehov: true,
        };

        it('skal returnere false dersom henting av motebehov feilet', () => {
            const motebehovReducer = {
                hentingFeilet: true,
            };

            const resultat = manglerMotebehovSvarIOppfolgingstilfelle(motebehovReducer, sykeforlopsPerioder, sykmeldt);
            const forventet = false;

            expect(resultat).to.equal(forventet);
        });

        it('skal returnere false dersom det er motebehovsvar, og det ble sendt inn etter starten av oppfolgingstilfellet', () => {
            const motebehovReducer = {
                data: [
                    {
                        opprettetDato: datoIOppfolgingsperiode,
                        aktorId: 'sykmeldtAktorId',
                        opprettetAv: 'veilederAktorId',
                        motebehovSvar,
                    },
                ],
            };

            const resultat = manglerMotebehovSvarIOppfolgingstilfelle(motebehovReducer, sykeforlopsPerioder, sykmeldt);
            const forventet = false;
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere true dersom det er motebehovsvar, men det ble sendt inn for starten av oppfolgingstilfellet', () => {
            const motebehovReducer = {
                data: [
                    {
                        opprettetDato: datoForOppfolgingsperiode,
                        aktorId: 'sykmeldtAktorId',
                        opprettetAv: 'veilederAktorId',
                        motebehovSvar,
                    },
                ],
            };

            const resultat = manglerMotebehovSvarIOppfolgingstilfelle(motebehovReducer, sykeforlopsPerioder, sykmeldt);
            const forventet = true;
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere true dersom det ikke er motebehovsvar', () => {
            const motebehovReducer = {
                data: [
                    {
                        opprettetDato: datoForOppfolgingsperiode,
                        aktorId: 'sykmeldtAktorId',
                        opprettetAv: 'veilederAktorId',
                    },
                ],
            };

            const resultat = manglerMotebehovSvarIOppfolgingstilfelle(motebehovReducer, sykeforlopsPerioder, sykmeldt);
            const forventet = true;
            expect(resultat).to.equal(forventet);
        });
    });
});
