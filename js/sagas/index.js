import { all } from 'redux-saga/effects';
import { sykeforlopsPerioderSagas } from '@navikt/digisyfo-npm';
import sykmeldteSagas from './sykmeldteSagas';
import sykmeldingerSagas from '../sykmeldinger/data/sykmeldingerSagas';
import motebehovSagas from './motebehovSagas';
import moterSagas from './moterSagas';
import svarSagas from './svarSagas';

export default function* rootSaga() {
    yield all([
        sykmeldteSagas(),
        sykmeldingerSagas(),
        motebehovSagas(),
        moterSagas(),
        svarSagas(),
        sykeforlopsPerioderSagas(),
    ]);
}

