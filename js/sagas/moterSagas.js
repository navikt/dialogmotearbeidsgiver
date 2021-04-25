import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '../logging';
import { HENT_MOTER_FORESPURT, henterMoter, moterHentet, hentMoterFeilet } from '../actions/moter_actions';
import { API_NAVN, hentSyfoApiUrl, get } from '../gateway-api/gatewayApi';

export function* hentArbeidsgiversMoter() {
  yield put(henterMoter());
  try {
    const url = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN)}/bruker/arbeidsgiver/moter`;
    const data = yield call(get, url);
    yield put(moterHentet(data));
  } catch (e) {
    log(e);
    yield put(hentMoterFeilet());
  }
}

function* watchHentMoter() {
  yield takeEvery(HENT_MOTER_FORESPURT, hentArbeidsgiversMoter);
}

export default function* moterSagas() {
  yield fork(watchHentMoter);
}
