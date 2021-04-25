var fs = require('fs');
var Mustache = require('mustache');

env = process.argv[2];
var timestamp = process.argv[3] || Date.now().toString();

var dev = {
  timestamp: `${timestamp}`,
  buildRoot: 'http://localhost:9091/assets',
  restRoot: 'http://localhost:8080/syforest',
  bundleFileName: `bundle.js`,
  enableLogging: true,
  isProd: false,
};

var prod = {
  timestamp: `${timestamp}`,
  buildRoot: '/dialogmotearbeidsgiver/js',
  restRoot: '/syforest',
  bundleFileName: 'bundle-prod.js',
  enableLogging: false,
  isProd: true,
};

var settings = env === 'prod' ? prod : dev;

fs.readFile('html/syfoagfront.mustache', function (err, data) {
  if (err) throw err;
  const settingsFront = Object.assign({}, settings, {
    spinnerMedTekst: true,
    spinnerUtenTekst: false,
  });
  const settingsAndre = Object.assign({}, settings, {
    spinnerMedTekst: false,
    spinnerUtenTekst: true,
  });
  const htmlFront = Mustache.render(data.toString(), settingsFront);
  const htmlAndre = Mustache.render(data.toString(), settingsAndre);
  fs.writeFile('../main/webapp/syfoagfront.html', htmlFront, 'utf-8', (err) => {
    if (err) throw err;
  });
  fs.writeFile('../main/webapp/syfoagfront_undersider.html', htmlAndre, 'utf-8', (err) => {
    if (err) throw err;
  });
});
