import 'whatwg-fetch';
import 'babel-polyfill';
import { render } from 'react-dom';
import {
    hentLedetekster,
    setPerformOnHttpCalls,
    forlengInnloggetSesjon,
    sjekkInnloggingssesjon,
} from '@navikt/digisyfo-npm';
import { Provider } from 'react-redux';
import React from 'react';
import AppRouter from './routers/AppRouter';
import history from './history';
import store from './store';
import { hentSykmeldte } from './actions/sykmeldte_actions';
import '../styles/styles.less';
import './logging';

if (window.location.href.indexOf('visLedetekster=true') > -1) {
    window.VIS_LEDETEKSTNOKLER = true;
} else if (window.location.href.indexOf('visLedetekster=false') > -1) {
    window.VIS_LEDETEKSTNOKLER = false;
}

store.dispatch(hentLedetekster());
store.dispatch(hentSykmeldte());
store.dispatch(forlengInnloggetSesjon());

setPerformOnHttpCalls(() => { store.dispatch(forlengInnloggetSesjon()); });

setInterval(() => {
    store.dispatch(sjekkInnloggingssesjon());
}, 5000);

render(<Provider store={store}>
    <AppRouter history={history} />
</Provider>,
document.getElementById('maincontent'));

export {
    history,
    store,
};
