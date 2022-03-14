import { call, put, takeEvery } from 'redux-saga/effects';
import { log } from '@/logging';
import { SEND_SVAR_FORESPURT, senderSvar, sendSvarFeilet, svarSendt } from '@/actions/moter_actions';
import { post } from '@/api/axios';
import { MOTEADMIN_API } from '@/MVP/globals/paths';

export function* sendSvar(action) {
  yield put(senderSvar());
  try {
    const url = `${MOTEADMIN_API}/${action.moteUuid}/send`;
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
