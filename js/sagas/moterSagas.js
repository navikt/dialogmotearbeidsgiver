import { call, put, takeEvery } from 'redux-saga/effects';
import { log } from '@/logging';
import { HENT_MOTER_FORESPURT, henterMoter, hentMoterFeilet, moterHentet } from '@/actions/moter_actions';
import { get } from '@/api/axios';
import { MOTEADMIN_API } from '@/MVP/globals/paths';

export function* hentArbeidsgiversMoter() {
  yield put(henterMoter());
  try {
    const data = yield call(get, `${MOTEADMIN_API}/arbeidsgiver/moter`);
    yield put(moterHentet(data));
  } catch (e) {
    log(e);
    yield put(hentMoterFeilet());
  }
}

export default function* moterSagas() {
  yield takeEvery(HENT_MOTER_FORESPURT, hentArbeidsgiversMoter);
}
