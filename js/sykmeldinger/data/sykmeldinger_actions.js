import * as actiontyper from '../../actions/actiontyper';

export function henterSykmeldinger(koblingId) {
    return {
        type: actiontyper.HENTER_SYKMELDINGER,
        koblingId,
    };
}

export function sykmeldingerHentet(sykmeldinger = [], koblingId) {
    return {
        type: actiontyper.SYKMELDINGER_HENTET,
        sykmeldinger,
        koblingId,
    };
}

export function hentSykmeldingerFeilet(koblingId, statuskode = '500') {
    return {
        koblingId,
        type: actiontyper.HENT_SYKMELDINGER_FEILET,
        statuskode,
    };
}

export function hentSykmeldinger(koblingId) {
    return {
        type: actiontyper.HENT_SYKMELDINGER_FORESPURT,
        koblingId,
    };
}
