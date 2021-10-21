import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get, post } from '@/api/axios';
import { log } from '@/logging';
import {
  HENT_MOTEBEHOV_FORESPURT,
  hentMotebehovFeilet,
  hentMotebehovForbudt,
  hentMotebehovHenter,
  hentMotebehovHentet,
  SVAR_MOTEBEHOV_FORESPURT,
  svarMotebehovFeilet,
  svarMotebehovSender,
  svarMotebehovSendt,
} from '@/actions/motebehov_actions';
import { input2RSLagreMotebehov } from '@/utils/motebehovUtils';
import { skalHenteMotebehov } from '@/selectors/motebehovSelectors';
import { API_NAVN, hentSyfoApiUrl } from '@/api/apiUtils';

export function* hentMotebehov(action) {
  const fnr = action.sykmeldt.fnr;
  const virksomhetsnummer = action.sykmeldt.orgnummer;
  yield put(hentMotebehovHenter(fnr, virksomhetsnummer));
  try {
    const url = `${hentSyfoApiUrl(
      API_NAVN.SYFOMOTEBEHOV
    )}/v2/motebehov?fnr=${fnr}&virksomhetsnummer=${virksomhetsnummer}`;
    const data = yield call(get, url);
    yield put(hentMotebehovHentet(data, fnr, virksomhetsnummer));
  } catch (e) {
    log(e);
    if (e.message === '403') {
      yield put(hentMotebehovForbudt(fnr, virksomhetsnummer));
      return;
    }
    yield put(hentMotebehovFeilet(fnr, virksomhetsnummer));
  }
}

export function* hentMotebehovHvisIkkeHentet(action) {
  const skalHente = yield select(skalHenteMotebehov, action);
  if (skalHente) {
    yield hentMotebehov(action);
  }
}

export function* svarMotebehov(action) {
  const fnr = action.sykmeldt.fnr;
  const virksomhetsnummer = action.sykmeldt.orgnummer;
  const body = input2RSLagreMotebehov(action.svar, virksomhetsnummer, fnr);
  yield put(svarMotebehovSender(fnr, virksomhetsnummer));
  try {
    const url = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/motebehov`;
    yield call(post, url, body);
    yield put(svarMotebehovSendt(body, fnr, virksomhetsnummer));
  } catch (e) {
    if (e.message === '409') {
      window.location.reload();
      return;
    }
    log(e);
    yield put(svarMotebehovFeilet(fnr, virksomhetsnummer));
  }
}

export default function* motebehovSagas() {
  yield takeEvery(HENT_MOTEBEHOV_FORESPURT, hentMotebehovHvisIkkeHentet);
  yield takeEvery(SVAR_MOTEBEHOV_FORESPURT, svarMotebehov);
}
