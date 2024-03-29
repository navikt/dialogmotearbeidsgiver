export const NAV_PERSONIDENT_HEADER = 'nav-personident';

export const hentLoginUrl = () => {
  if (window.location.href.indexOf('www.nav') > -1) {
    // Prod
    return 'https://loginservice.nav.no/login';
  }
  // Preprod
  return 'https://loginservice.dev.nav.no/login';
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
