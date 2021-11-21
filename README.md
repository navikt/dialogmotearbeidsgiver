# Dialogmotearbeidsgiver

React frontend for arbeidsgivers dialogmøter

- Prod: https://www.nav.no/syk/dialogmotearbeidsgiver/<insertNarmesteLederId>
- Test: https://www-gcp.dev.nav.no/syk/dialogmotearbeidsgiver/<insertNarmesteLederId>
- Lokalt: http://localhost:8080/syk/dialogmotearbeidsgiver/123

### Kjøre koden lokalt:

- `$ npm install`
- `$ npm start`
- Data til dialogmøte kan bli endret i `moter.json`
- Møtebehovstatus kan bli endret i `mockSyfomotebehov.js`: bytt verdi av `motebehovStatusEnum` i `mockSyfomotebehov(...)`

- Kjør tester med `npm test`
- Lint JS-kode med `npm run lint` eller `npm run lint:fix`
