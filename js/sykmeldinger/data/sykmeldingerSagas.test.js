import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get } from '@navikt/digisyfo-npm';
import { hentSykmeldinger } from './sykmeldingerSagas';
import * as actions from './sykmeldinger_actions';

describe('sykmeldingerSagas', () => {
    describe('hentSykmeldinger med sykmeldt på plass', () => {
        const koblingId = '123';
        let action = actions.hentSykmeldinger(koblingId);
        const sykmeldt = {
            fnr: '12345678910',
            navn: 'Ole Pettersen',
            orgnummer: '123',
            koblingId: '123',
        };

        const generator = hentSykmeldinger(action);

        it('Skal dispatche HENTER_SYKMELDINGER', () => {
            const nextPut = put(actions.henterSykmeldinger('123'));
            expect(generator.next(sykmeldt).value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente sykmeldinger', () => {
            const nextCall = call(get, '/syforest/arbeidsgiver/sykmeldinger?koblingId=123');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dispatche HENTER_SYKMELDINGER', () => {
            action = actions.sykmeldingerHentet([{ id: '1' }], '123');
            const nextPut = put(action);
            expect(generator.next([{
                id: '1',
            }], '123').value).to.deep.equal(nextPut);
        });
    });
});
