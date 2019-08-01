import { toggleErPaaHeroku } from '../toggles';

const erHerokuApp = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    return url.indexOf('herokuapp') > -1;
};

export const hentOppfolgingsplanarbeidsgiverUrl = (koblingId) => {
    const sluttUrl = `${process.env.REACT_APP_OPPFOLGINGSDIALOG_CONTEXT_ROOT}/${koblingId}/oppfolgingsplaner`;
    return toggleErPaaHeroku()
        ? `https://oppfolgingsplanarbeidsgiver.herokuapp.com${sluttUrl}`
        : sluttUrl;
};

export const getSykefravaerarbeidsgiverUrl = (sti) => {
    return erHerokuApp()
        ? `https://sykefravaerarbeidsgiver.herokuapp.com${sti}`
        : sti;
};
