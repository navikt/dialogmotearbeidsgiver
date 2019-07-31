import chai from 'chai';
import {
    tidligsteFom,
    senesteTom,
    periodeOverlapperMedPeriode,
    fraInputdatoTilJSDato,
    sorterPerioder,
} from '../../js/utils/periodeUtils';

const expect = chai.expect;

describe('periodeUtils', () => {
    describe('fraInputdatoTilJSDato', () => {
        it('Skal håndtere dd.mm.åååå', () => {
            const dato = '12.02.2017';
            const res = fraInputdatoTilJSDato(dato);
            expect(res.getTime()).to.equal(new Date('2017-02-12').getTime());
        });

        it('Skal håndtere dd.mm.åå', () => {
            const dato = '12.02.17';
            const res = fraInputdatoTilJSDato(dato);
            expect(res.getTime()).to.equal(new Date('2017-02-12').getTime());
        });
    });


    describe('tidligsteFom og senesteTom', () => {
        it('Regner ut tidligsteFom og senesteTom', () => {
            const perioder = [
                {
                    fom: '2017-05-10',
                    tom: '2017-05-15',
                }, {
                    fom: '2017-05-01',
                    tom: '2017-05-09',
                }, {
                    fom: '2017-04-10',
                    tom: '2017-04-30',
                }, {
                    fom: '2017-05-16',
                    tom: '2017-05-20',
                }, {
                    fom: '2017-05-21',
                    tom: '2017-05-22',
                }, {},
            ];

            const fom = tidligsteFom(perioder);
            const tom = senesteTom(perioder);

            expect(fom).to.equal('2017-04-10');
            expect(tom).to.equal('2017-05-22');
        });
    });

    describe('periodeOverlapperMedPeriode', () => {
        let periodeA;
        let periodeB;
        let periodeD;

        beforeEach(() => {
            periodeA = {
                fom: '12.12.2012',
                tom: '15.12.2012',
            };
            periodeB = {
                fom: '16.12.2012',
                tom: '20.12.2012',
            };
            periodeD = {
                fom: '13.12.2012',
                tom: '23.12.2012',
            };
        });

        it('Returnerer true hvis periodene overlapper fullstendig', () => {
            expect(periodeOverlapperMedPeriode(periodeA, periodeA)).to.equal(true);
        });

        it('Returnerer false hvis periodene ikke overlapper i det hele tatt', () => {
            expect(periodeOverlapperMedPeriode(periodeA, periodeB)).to.equal(false);
        });

        it('Returnerer true hvis periodene overlapper delvis', () => {
            expect(periodeOverlapperMedPeriode(periodeA, periodeD)).to.equal(true);
        });

        it('Returnerer true hvis periodeA er innenfor periodeB', () => {
            expect(periodeOverlapperMedPeriode(periodeB, periodeD)).to.equal(true);
        });

        it('Returnerer true hvis periodeB er innenfor periodeA', () => {
            expect(periodeOverlapperMedPeriode(periodeD, periodeB)).to.equal(true);
        });
    });

    describe('sorterPerioder', () => {
        let periodeA;
        let periodeB;
        let periodeC;
        let periodeD;

        beforeEach(() => {
            periodeA = {
                fom: new Date('2012-12-12'),
                tom: new Date('2012-12-15'),
            };
            periodeB = {
                fom: new Date('2012-12-16'),
                tom: new Date('2012-12-20'),
            };
            periodeC = {
                fom: new Date('2012-12-21'),
                tom: new Date('2012-12-25'),
            };
            periodeD = {
                fom: new Date('2012-12-13'),
                tom: new Date('2012-12-23'),
            };
        });

        it('Skal sortere periodene slik at den som er lengst frem i tid kommer sist', () => {
            const perioder1 = [periodeB, periodeA, periodeC, periodeD];
            const res1 = sorterPerioder(perioder1);
            expect(res1).to.deep.equal([periodeA, periodeB, periodeD, periodeC]);

            const perioder2 = [periodeB, periodeC, periodeA, periodeD];
            const res2 = sorterPerioder(perioder2);
            expect(res2).to.deep.equal([periodeA, periodeB, periodeD, periodeC]);

            const perioder3 = [periodeD, periodeB, periodeA, periodeC];
            const res3 = sorterPerioder(perioder3);
            expect(res3).to.deep.equal([periodeA, periodeB, periodeD, periodeC]);
        });
    });
});
