# Dialogmotearbeidsgiver

Frontend for arbeidsgivers digitalisering av sykefraværsoppfølging (DigiSYFO) http://tjenester.nav.no/dialogmotearbeidsgiver/

### TL;DR

React-app for den sykmeldtes nærmeste leder. Vise dialogmøter

* For å kjøre koden lokalt:
    - `$ npm install`
    - `$ npm run dev`
    - I et annet vindu `$ npm run start-local`
    - Gå til `http://localhost:8189/dialogmotearbeidsgiver/28780`
    - Eventuelt kan komandoene kjøres fra `package.json` i intellij.
    - Data til dialogmøte kan bli endret i `moter.json`
    - Møtebehovstatus kan bli endret i `mockSyfomotebehov.js`: bytt verdi av `motebehovStatusEnum` i `mockSyfomotebehov(...)`

* Kjør tester med `npm test` eller `npm test:watch`
* Lint JS-kode med `npm run lint` eller `npm run lint:fix`

## Deploy mock app til Heroku
Installer heroku, på mac kan du bruke brew: `$ brew install heroku`.

For å kunne deploye til Heroku må du først logge inn: 
* `$ heroku login`
* `$ heroku container:login`

Deploy til heroku ved å kjøre deployscript: `$ sh deploy-heroku.sh`.

