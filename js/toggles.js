export const toggleErPaaHeroku = () => {
    const url = window.location.href;
    return url.indexOf('heroku') > -1;
};

export const isMeldMotebehovEnabled = () => {
    return false;
};
