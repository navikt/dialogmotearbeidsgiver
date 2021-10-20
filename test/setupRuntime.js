require('core-js/stable');
require('regenerator-runtime/runtime');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('@babel/register')({ extensions: ['.js', '.jsx', '.ts', '.tsx'] });
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')();
