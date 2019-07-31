import { toggleErPaaHeroku } from '../toggles';

export const hentOppfolgingsplanarbeidsgiverUrl = (koblingId) => {
    const sluttUrl = `${process.env.REACT_APP_OPPFOLGINGSDIALOG_CONTEXT_ROOT}/${koblingId}/oppfolgingsplaner`;
    return toggleErPaaHeroku()
        ? `https://oppfolgingsplanarbeidsgiver.herokuapp.com${sluttUrl}`
        : sluttUrl;
};
