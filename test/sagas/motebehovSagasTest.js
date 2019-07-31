import { expect } from 'chai';
import {
    put,
    call,
} from 'redux-saga/effects';
import {
    HENT_MOTEBEHOV_HENTER,
    HENT_MOTEBEHOV_HENTET,
    SVAR_MOTEBEHOV_SENDER,
    SVAR_MOTEBEHOV_SENDT,
} from '../../js/actions/motebehov_actions';
import {
    hentMotebehov,
    svarMotebehov,
} from '../../js/sagas/motebehovSagas';
import {
    get,
    post,
    hentSyfoApiUrl,
    API_NAVN,
} from '../../js/gateway-api/gatewayApi';

describe('motebehovSagas', () => {
    const virksomhetsnummer = '123456789';
    const fnr = '1234';
    const sykmeldt = {
        fnr,
        orgnummer: virksomhetsnummer,
    };
    const apiUrlBase = hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV);

    describe('hentMotebehov', () => {
        const generator = hentMotebehov({ sykmeldt });

        it(`Skal dispatche ${HENT_MOTEBEHOV_HENTER}`, () => {
            const nextPut = put({
                type: HENT_MOTEBEHOV_HENTER,
                fnr,
                virksomhetsnummer,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const nextCall = call(get, `${apiUrlBase}/motebehov?fnr=${fnr}&virksomhetsnummer=${virksomhetsnummer}`);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dispatche ${HENT_MOTEBEHOV_HENTET}`, () => {
            const nextPut = put({
                type: HENT_MOTEBEHOV_HENTET,
                data: [
                    { motebehovSvar: null },
                ],
                fnr,
                virksomhetsnummer,
            });
            expect(generator.next([
                { motebehovSvar: null },
            ]).value).to.deep.equal(nextPut);
        });
    });

    describe('svarMotebehov', () => {
        const generator = svarMotebehov({
            svar: {
                harMotebehov: true,
                forklaring: 'forklaring',
            },
            sykmeldt,
        });

        it(`Skal dispatche ${SVAR_MOTEBEHOV_SENDER}`, () => {
            const nextPut = put({
                type: SVAR_MOTEBEHOV_SENDER,
                fnr,
                virksomhetsnummer,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const nextCall = call(post, `${apiUrlBase}/motebehov?fnr=${fnr}`, {
                virksomhetsnummer,
                arbeidstakerFnr: fnr,
                motebehovSvar: {
                    harMotebehov: true,
                    forklaring: 'forklaring',
                },
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dispatche ${SVAR_MOTEBEHOV_SENDT}`, () => {
            const nextPut = put({
                type: SVAR_MOTEBEHOV_SENDT,
                svar: {
                    arbeidstakerFnr: fnr,
                    virksomhetsnummer,
                    motebehovSvar: {
                        harMotebehov: true,
                        forklaring: 'forklaring',
                    },
                },
                fnr,
                virksomhetsnummer,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
