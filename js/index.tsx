import 'whatwg-fetch';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { render } from 'react-dom';
import { setPerformOnHttpCalls } from '@navikt/digisyfo-npm';
import { Provider } from 'react-redux';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import * as Sentry from '@sentry/browser';
import { minutesToMillis } from './MVP/utils';
import AppRouter from './routers/AppRouter';
import store from './store';
import '../styles/styles.less';
require('./logging');
import { forlengInnloggetSesjon, sjekkInnloggingssesjon } from './timeout/timeout_actions';

Sentry.init({ dsn: 'https://8c76565489fd4178866fec65a612668e@sentry.gc.nav.no/33' });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: minutesToMillis(60),
      staleTime: minutesToMillis(30),
    },
  },
});

store.dispatch(forlengInnloggetSesjon());

setPerformOnHttpCalls(() => {
  store.dispatch(forlengInnloggetSesjon());
});

setInterval(() => {
  store.dispatch(sjekkInnloggingssesjon());
}, 5000);

render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById('maincontent')
);

export { store };
