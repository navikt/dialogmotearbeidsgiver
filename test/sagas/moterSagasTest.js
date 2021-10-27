import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { hentArbeidsgiversMoter } from '../../js/sagas/moterSagas';
import { get, hentSyfoApiUrl, API_NAVN } from '../../js/gateway-api/gatewayApi';

describe('moterSagas', () => {
  let apiUrlBase;

  describe('hentMoter', () => {
    const generator = hentArbeidsgiversMoter();
    apiUrlBase = hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN);

    it('Skal dispatche HENTER_MOTER', () => {
      const nextPut = put({
        type: 'HENTER_MOTER',
      });
      expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest hente moter', () => {
      const nextCall = call(get, `${apiUrlBase}/bruker/arbeidsgiver/moter`);
      expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette moter', () => {
      const nextPut = put({
        type: 'MOTER_HENTET',
        data: [
          {
            navn: 'Ole Olsen',
          },
        ],
      });
      expect(
        generator.next([
          {
            navn: 'Ole Olsen',
          },
        ]).value
      ).to.deep.equal(nextPut);
    });
  });
});
