import { expect } from 'chai';
import {
    visKlokkeslett,
    visKortDato,
} from '../../js/utils/datoUtils';

describe('datoUtils', () => {
    describe('visKlokkeslett', () => {
        it('Skal vise klokkeslett på riktig format', () => {
            const d = visKlokkeslett(new Date(2017, 4, 3, 9, 0));
            expect(d).to.equal('09.00');
        });
    });

    describe('visKortDato', () => {
        it('Skal vise kort dato på riktig format', () => {
            const d = visKortDato(new Date(2017, 10, 19, 9, 0));
            expect(d).to.equal('19.11.2017');
        });

        it('Skal vise kort dato med 0 foran dersom det bare er et siffer', () => {
            const d = visKortDato(new Date(2002, 8, 9, 9, 0));
            expect(d).to.equal('09.09.2002');
        });
    });
});
