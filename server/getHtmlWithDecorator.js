const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr');

const getHtmlWithDecorator = (filePath) =>
  injectDecoratorServerSide({
    dekoratorenUrl: process.env.DECORATOR_URL,
    env: process.env.DECORATOR_ENV,
    filePath: filePath,
    urlLookupTable: false,
    chatbot: true,
  });

module.exports = getHtmlWithDecorator;
