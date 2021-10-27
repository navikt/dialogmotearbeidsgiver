import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { sendSvar } from '../../js/sagas/svarSagas';
import { sendSvar as sendSvarAction, senderSvar } from '../../js/actions/moter_actions';
import { post, hentSyfoApiUrl, API_NAVN } from '../../js/gateway-api/gatewayApi';

describe('svarSagas', () => {
  let apiUrlBase;

  describe('sendSvar', () => {
    apiUrlBase = hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN);
    const action = sendSvarAction('minFineMoteUuid', 'arbeidsgiver', [1, 2]);
    const generator = sendSvar(action);

    it('Skal dispatche SENDER_SVAR', () => {
      const nextPut = put(senderSvar());
      expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal poste svar', () => {
      const nextCall = call(post, `${apiUrlBase}/bruker/moter/minFineMoteUuid/send`, {
        valgteAlternativIder: [1, 2],
        deltakertype: 'arbeidsgiver',
      });
      expect(generator.next().value).to.deep.equal(nextCall);
    });
  });
});
