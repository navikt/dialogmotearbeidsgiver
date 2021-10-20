import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import path from 'path';
import { JSDOM } from 'jsdom';
import { config } from 'dotenv';

Enzyme.configure({ adapter: new Adapter() });

const dotEnvPath = path.resolve('.env');

config({
  path: dotEnvPath,
});

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => {
      return typeof target[prop] === 'undefined';
    })
    .map((prop) => {
      return Object.getOwnPropertyDescriptor(src, prop);
    });
  Object.defineProperties(target, props);
}

let temp = null;
const localS = {
  getItem() {
    return temp;
  },
  setItem(key, value) {
    temp = value;
  },
};

global.HTMLElement = window.HTMLElement;
global.localStorage = localS;
global.XMLHttpRequest = window.XMLHttpRequest;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.window.APP_SETTINGS = {
  APP_ROOT: '/dialogmotearbeidsgiver',
};
copyProps(window, global);
