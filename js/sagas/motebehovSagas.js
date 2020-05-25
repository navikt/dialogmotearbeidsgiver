import {
    call,
    put,
    fork,
    takeEvery,
    all,
    select,
} from 'redux-saga/effects';
import { log } from '../logging';
import {
    API_NAVN,
    hentSyfoApiUrl,
    get,
    post,
} from '../gateway-api/index';
import {
    hentMotebehovHenter,
    hentMotebehovHentet,
    hentMotebehovFeilet,
    hentMotebehovForbudt,
    svarMotebehovSender,
    svarMotebehovSendt,
    svarMotebehovFeilet,
    HENT_MOTEBEHOV_FORESPURT,
    SVAR_MOTEBEHOV_FORESPURT,
} from '../actions/motebehov_actions';
import { input2RSLagreMotebehov } from '../utils/motebehovUtils';
import { skalHenteMotebehov } from '../selectors/motebehovSelectors';

export function* hentMotebehov(action) {
    const fnr = action.sykmeldt.fnr;
    const virksomhetsnummer = action.sykmeldt.orgnummer;
    yield put(hentMotebehovHenter(fnr, virksomhetsnummer));
    try {
        const url = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/motebehov?fnr=${fnr}&virksomhetsnummer=${virksomhetsnummer}`;
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
    const fnr = action.sykmeldt.fnr || '';
    const virksomhetsnummer = action.sykmeldt.orgnummer || '';
    const body = input2RSLagreMotebehov(action.svar, virksomhetsnummer, fnr);
    yield put(svarMotebehovSender(fnr, virksomhetsnummer));
    try {
        const url = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/motebehov?fnr=${fnr}`;
        yield call(post, url, body);
        yield put(svarMotebehovSendt(body, fnr, virksomhetsnummer));
    } catch (e) {
        log(e);
        yield put(svarMotebehovFeilet(fnr, virksomhetsnummer));
    }
}

function* watchHentMotebehov() {
    yield takeEvery(HENT_MOTEBEHOV_FORESPURT, hentMotebehovHvisIkkeHentet);
}

function* watchSvarMotebehov() {
    yield takeEvery(SVAR_MOTEBEHOV_FORESPURT, svarMotebehov);
}

export default function* motebehovSagas() {
    yield all([
        fork(watchHentMotebehov),
        fork(watchSvarMotebehov),
    ]);
}
