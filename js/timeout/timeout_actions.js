export const FORLENG_INNLOGGET_SESJON = 'FORLENG_INNLOGGET_SESJON';
export const SNART_UTLOGGET = 'SNART_UTLOGGET';
export const SJEKK_INNLOGGINGSSESJON = 'SJEKK_INNLOGGINGSSESJON';

export const forlengInnloggetSesjon = () => {
    return {
        type: FORLENG_INNLOGGET_SESJON,
    };
};

export const snartUtlogget = () => {
    return {
        type: SNART_UTLOGGET,
    };
};

export const sjekkInnloggingssesjon = () => {
    return {
        type: SJEKK_INNLOGGINGSSESJON,
    };
};
