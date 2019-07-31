export const toggleErPaaHeroku = () => {
    const url = window.location.href;
    return url.indexOf('heroku') > -1;
};
