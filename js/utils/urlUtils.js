const erHerokuApp = () => {
  const url = window && window.location && window.location.href ? window.location.href : '';

  return url.indexOf('herokuapp') > -1;
};

export const isProd = () => {
  const url = window.location.href;
  return url.indexOf('www.nav.no') > -1;
};

export const getSykefravaerarbeidsgiverUrl = (sti) => {
  return erHerokuApp() ? `https://sykefravaerarbeidsgiver.herokuapp.com` : sti;
};
