import { call, put, takeEvery } from 'redux-saga/effects';
import { log } from '@/logging';
import * as actions from '../actions/sykmeldte_actions';
import * as actiontyper from '../actions/actiontyper';
import { getContextRoot } from '@/routers/paths';
import { get } from '@/api/axios';

export function* hentArbeidsgiversSykmeldte(action) {
  yield put(actions.henterSykmeldte());
  try {
    const url = `${getContextRoot()}/api/dinesykmeldte/${action.narmestelederId}`;
    const data = yield call(get, url);
    yield put(actions.sykmeldteHentet(data));
  } catch (e) {
    log(e);
    yield put(actions.hentSykmeldteFeilet());
  }
}

export default function* sykmeldteSagas() {
  yield takeEvery(actiontyper.HENT_SYKMELDTE_FORESPURT, hentArbeidsgiversSykmeldte);
}
