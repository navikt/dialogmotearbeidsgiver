import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '../logging';
import {
    SEND_SVAR_FORESPURT,
    senderSvar,
    sendSvarFeilet,
    svarSendt,
} from '../actions/moter_actions';
import {
    API_NAVN,
    hentSyfoApiUrl,
    post,
} from '../gateway-api/gatewayApi';

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

function* watchSendSvar() {
    yield takeEvery(SEND_SVAR_FORESPURT, sendSvar);
}

export default function* svarSagas() {
    yield fork(watchSendSvar);
}
