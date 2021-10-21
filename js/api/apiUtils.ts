export const NAV_PERSONIDENT_HEADER = 'nav-personident';

export const hentLoginUrl = (): string => {
  if (window.location.href.indexOf('tjenester.nav') > -1) {
    // Prod
    return 'https://loginservice.nav.no/login';
  } else if (window.location.href.indexOf('localhost') > -1) {
    // Lokalt
    return 'http://localhost:8189/syfoapi/local/cookie';
  }
  // Preprod
  return 'https://loginservice-q.nav.no/login';
};

export const API_NAVN = {
  SYFOMOTEADMIN: 'syfomoteadmin',
  SYFOMOTEBEHOV: 'syfomotebehov',
};

export const hentSyfoApiUrl = (appNavn) => {
  const url = window && window.location && window.location.href ? window.location.href : '';

  if (url.indexOf('tjenester.nav') > -1) {
    // Prod
    return `https://syfoapi.nav.no/${appNavn}/api`;
  } else if (url.indexOf('localhost') > -1 || url.indexOf('herokuapp') > -1) {
    // Lokalt
    return `/${appNavn}/api`;
  }
  // Preprod
  return `https://syfoapi-q.nav.no/${appNavn}/api`;
};

export const defaultRequestHeaders = (personIdent?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (personIdent) {
    headers[NAV_PERSONIDENT_HEADER] = personIdent;
  }
  return headers;
};

let performOnHttpCalls = () => {
  return undefined;
};
export const setPerformOnHttpCalls = (_performOnHttpCalls) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  performOnHttpCalls = _performOnHttpCalls;
};
