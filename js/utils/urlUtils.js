export const isLabs = () => {
  const url = window && window.location && window.location.href ? window.location.href : '';

  return url.indexOf('.labs.nais.') > -1;
};

export const isProd = () => {
  const url = window.location.href;
  return url.indexOf('www.nav.no') > -1;
};

export const getSykefravaerarbeidsgiverUrl = (sti) => {
  return isLabs() ? process.env.SYKEFRAVAERARBEIDSGIVER_URL : sti;
};
