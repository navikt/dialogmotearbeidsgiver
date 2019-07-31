import { parseSykmelding } from '@navikt/digisyfo-npm';

export const MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING = 4;

const MILLISEKUNDER_PER_DAG = 86400000;

export const leggTilDagerPaaDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() + (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

export const leggTilMnderPaaDato = (dato, mnder) => {
    const nyDato = new Date(dato);
    nyDato.setMonth(nyDato.getMonth() + mnder);
    return new Date(nyDato);
};

export const leggTilMnderOgDagerPaaDato = (dato, mnder, dager) => {
    let nyDato = leggTilMnderPaaDato(dato, mnder);
    nyDato = leggTilDagerPaaDato(nyDato, dager);
    return new Date(nyDato);
};

const sykmelding = {
    id: '3456789',
    pasient: {
        fnr: '01234567891',
        fornavn: 'Per',
        etternavn: 'Person',
    },
    arbeidsgiver: 'Selskapet AS',
    mottakendeArbeidsgiver: 'Selskapet AS',
    orgnummer: '123456789',
    status: 'NY',
    identdato: new Date('2015-12-31'),
    diagnose: {
        hoveddiagnose: {
            diagnose: 'Influensa',
            diagnosesystem: 'ICPC',
            diagnosekode: 'LP2',
        },
    },
    mulighetForArbeid: {
        perioder: [{
            fom: new Date('2016-10-10'),
            tom: new Date('2016-10-15'),
            grad: 67,
            behandlingsdager: 3,
        }],
    },
    friskmelding: {
        arbeidsfoerEtterPerioden: true,
    },
    utdypendeOpplysninger: {},
    arbeidsevne: {},
    meldingTilNav: {},
    tilbakedatering: {},
    bekreftelse: {
        sykmelder: 'Ove Olsen',
        utstedelsesdato: new Date('2016-05-02'),
    },
};

const getSykmelding = (skmld = {}) => {
    const s = Object.assign({}, sykmelding, skmld);
    return parseSykmelding(s);
};

export const hentSykmeldingIkkeGyldigForOppfoelging = (dagensDato) => {
    return getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 3)).toISOString(),
                    tom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 2)).toISOString(),
                },
                {
                    fom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1)).toISOString(),
                    tom: leggTilMnderOgDagerPaaDato(dagensDato, -MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING, -1).toISOString(),
                },
            ],
        },
    });
};

export const hentSykmeldingGyldigForOppfoelging = (dagensDato) => {
    return getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: leggTilDagerPaaDato(dagensDato, -35).toISOString(),
                    tom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
                },
                {
                    fom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
                    tom: leggTilDagerPaaDato(dagensDato, 35).toISOString(),
                },
            ],
        },
    });
};

export default getSykmelding;
