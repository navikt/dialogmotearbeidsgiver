import 'whatwg-fetch';
import 'babel-polyfill';
import { render } from 'react-dom';
import { setPerformOnHttpCalls } from '@navikt/digisyfo-npm';
import { Provider } from 'react-redux';
import React from 'react';
import * as Sentry from '@sentry/browser';
import AppRouter from './routers/AppRouter';
import history from './history';
import store from './store';
import { hentSykmeldte } from './actions/sykmeldte_actions';
import '../styles/styles.less';
import './logging';
import { forlengInnloggetSesjon, sjekkInnloggingssesjon } from './timeout/timeout_actions';

Sentry.init({ dsn: 'https://8c76565489fd4178866fec65a612668e@sentry.gc.nav.no/33' });

store.dispatch(hentSykmeldte());
store.dispatch(forlengInnloggetSesjon());

setPerformOnHttpCalls(() => {
  store.dispatch(forlengInnloggetSesjon());
});

setInterval(() => {
  store.dispatch(sjekkInnloggingssesjon());
}, 5000);

render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById('maincontent')
);

export { history, store };
