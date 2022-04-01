export const isLabs = () => {
  const url = window.location.href;
  return url.indexOf('.labs.nais.') > -1;
};

export const isProd = () => {
  const url = window.location.href;
  return url.indexOf('www.nav.no') > -1;
};

export const isLocal = () => {
  const url = window.location.href;
  return url.indexOf('localhost') > -1;
};

export const isLocalOrLabs = () => isLocal() || isLabs();

export const getSykefravaerarbeidsgiverUrl = (sti = '') => {
  return isLabs() ? process.env.SYKEFRAVAERARBEIDSGIVER_LABS_URL || '' : sti;
};
