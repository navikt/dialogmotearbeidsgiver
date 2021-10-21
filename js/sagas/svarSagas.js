import { call, put, takeEvery } from 'redux-saga/effects';
import { log } from '@/logging';
import { SEND_SVAR_FORESPURT, senderSvar, sendSvarFeilet, svarSendt } from '@/actions/moter_actions';
import { API_NAVN, hentSyfoApiUrl } from '@/api/apiUtils';
import { post } from '@/api/axios';

export function* sendSvar(action) {
  yield put(senderSvar());
  try {
    const url = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN)}/bruker/moter/${action.moteUuid}/send`;
    yield call(post, url, {
      valgteAlternativIder: action.data,
      deltakertype: action.deltakertype,
    });
    yield put(svarSendt(action.data, action.deltakertype, action.moteUuid));
  } catch (e) {
    log(e);
    yield put(sendSvarFeilet());
  }
}

export default function* svarSagas() {
  yield takeEvery(SEND_SVAR_FORESPURT, sendSvar);
}
