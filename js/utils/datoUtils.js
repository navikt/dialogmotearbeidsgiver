import {
    tilLesbarDatoMedArstall,
} from '@navikt/digisyfo-npm';
import { capitalizeForsteBokstav } from './strengUtils';

export const ANTALL_MS_DAG = 1000 * 60 * 60 * 24;

const maneder = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];
export const ukedager = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];

const pad = (int) => {
    if (int < 10) {
        return `0${int}`;
    }
    return int;
};

export const hentDagerMellomDatoer = (startDato, sluttDato) => {
    return Math.round(Math.abs((sluttDato.getTime() - startDato.getTime()) / (ANTALL_MS_DAG)));
};

export const leggTilDagerPaaDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() + (dager * ANTALL_MS_DAG));
    return new Date(nyDato);
};

export const tilLesbarDatoMedArstallOgUkedag = (datoArg) => {
    return datoArg
        ? `${capitalizeForsteBokstav(ukedager[new Date(datoArg).getDay()])} ${tilLesbarDatoMedArstall(datoArg)}`
        : null;
};

export const visDato = (d) => {
    const maned = maneder[d.getMonth()];
    return `${capitalizeForsteBokstav(ukedager[d.getDay()])} ${d.getDate()}. ${maned} ${d.getFullYear()}`;
};

export const visKortDato = (d) => {
    const dag = pad(d.getDate());
    const maned = pad(d.getMonth() + 1);
    return `${dag}.${maned}.${d.getFullYear()}`;
};

export const visKlokkeslett = (d) => {
    if (typeof d === 'undefined' || d === null) {
        return null;
    }
    const hour = pad(d.getHours());
    const minute = pad(d.getMinutes());
    return `${hour}.${minute}`;
};

export const lagJsDate = (dato) => {
    if (dato) {
        const year = dato.substring(0, 4);
        const month = dato.substring(5, 7);
        const day = dato.substring(8, 10);
        const hour = dato.substring(11, 13);
        const minute = dato.substring(14, 16);
        const seconds = dato.substring(17, 19);
        return new Date(year, month - 1, day, hour, minute, seconds);
    }
    return dato;
};

export const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
}
