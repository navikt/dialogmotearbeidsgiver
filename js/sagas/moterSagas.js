import { call, put, takeEvery } from 'redux-saga/effects';
import { log } from '@/logging';
import { HENT_MOTER_FORESPURT, henterMoter, hentMoterFeilet, moterHentet } from '@/actions/moter_actions';
import { API_NAVN, hentSyfoApiUrl } from '@/api/apiUtils';
import { get } from '@/api/axios';

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

export default function* moterSagas() {
  yield takeEvery(HENT_MOTER_FORESPURT, hentArbeidsgiversMoter);
}
