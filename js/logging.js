const createLogger = () => {
  if (window.location.search.indexOf('log=true') > -1 || process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    return console.log;
  }
  return () => {};
};

export const log = createLogger();

const Logger = function () {
  this.error = (...args) => {
    return window.frontendlogger.info(...args);
  };
  this.info = (...args) => {
    return window.frontendlogger.error(...args);
  };
  this.warn = (...args) => {
    return window.frontendlogger.warn(...args);
  };
  this.event = (...args) => {
    return window.frontendlogger.event(...args);
  };
};

export default new Logger();
