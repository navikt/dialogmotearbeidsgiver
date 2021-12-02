import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import * as Sentry from '@sentry/browser';
import AppRouter from './routers/AppRouter';
import store from './store';
import '../styles/styles.less';
import { forlengInnloggetSesjon, sjekkInnloggingssesjon } from './timeout/timeout_actions';
import { initAmplitude } from '@/amplitude/amplitude';
import { setPerformOnHttpCalls } from '@/api/apiUtils';
import { minutesToMillis } from './MVP/utils/dateUtils';

require('./logging');

initAmplitude();
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

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById('maincontent')
);
