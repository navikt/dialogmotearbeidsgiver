import { all } from 'redux-saga/effects';
import sykmeldteSagas from './sykmeldteSagas';
import motebehovSagas from './motebehovSagas';
import moterSagas from './moterSagas';
import svarSagas from './svarSagas';

export default function* rootSaga() {
  yield all([sykmeldteSagas(), motebehovSagas(), moterSagas(), svarSagas()]);
}
