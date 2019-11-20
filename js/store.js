import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
} from 'redux';
import {
    sykeforlopsPerioder,
    timeout,
    toggles,
} from '@navikt/digisyfo-npm';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';

import lightbox from './reducers/lightbox';
import motebehov from './reducers/motebehov';
import motebehovSvar from './reducers/motebehovSvar';
import moter from './reducers/moter';
import svar from './reducers/svar';
import sykmeldinger from './sykmeldinger/data/sykmeldinger';
import sykmeldte from './reducers/sykmeldte';
import rootSaga from './sagas';

const rootReducer = combineReducers({
    form: formReducer,
    motebehov,
    motebehovSvar,
    lightbox,
    moter,
    svar,
    sykmeldte,
    sykmeldinger,
    timeout,
    toggles,
    sykeforlopsPerioder,
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware),
));

sagaMiddleware.run(rootSaga);

export default store;
