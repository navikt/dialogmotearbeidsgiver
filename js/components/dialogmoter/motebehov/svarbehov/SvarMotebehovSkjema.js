import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import Alertstripe from 'nav-frontend-alertstriper';
import {
    motebehovSvarReducerPt,
    sykmeldt as sykmeldtPt,
} from '../../../../propTypes';
import Tekstomraade from '../../../skjema/Tekstomraade';
import Radioknapper from '../../../skjema/Radioknapper';
import MotebehovSkjemaKnapper from '../MotebehovSkjemaKnapper';
import ObligatoriskeFelterInfotekst from "../ObligatoriskeFelterInfotekst";

export const tekstfeltRegex = new RegExp('.*<[^ ][^>]+[^ ]>.*');

export const felterPt = PropTypes.shape({});

const SVAR_MOTEBEHOV_SKJEMANAVN = 'svarMotebehov';

const tekster = {
    sensitiv: 'Ikke skriv sensitiv informasjon, for eksempel om den ansattes helse.',
    svarNeiAlert: 'Selv om du svarer nei, kan det hende vi likevel kommer til at det er nødvendig med et møte. Svaret ditt brukes når vi vurderer behovet.',
};

const MAX_LENGTH = 1000;

export const FELTER = {
    harMotebehov: {
        navn: 'harMotebehov',
        spoersmaal: 'Har dere behov for et møte med NAV?',
        svar: [
            {
                tekst: 'Ja, jeg mener det er behov for et møte',
                verdi: true,
            },
            {
                tekst: 'Nei, jeg mener det ikke er behov for et møte',
                verdi: false,
            },
        ],
    },
    forklaring: {
        navn: 'forklaring',
        spoersmaal: 'Begrunnelse',
    },
};

export const VilHaMoteSvarKnapper = (
    {
        felt,
    }) => {
    return (<div className="skjemaelement">
        <h3
            className="skjemaelement__sporsmal"
            id={felt.navn}
        >
            {felt.spoersmaal}
        </h3>
        <Field
            id={felt.navn}
            name={felt.navn}
            component={Radioknapper}
        >
            {
                felt.svar.map((svar, index) => {
                    return (
                        <input
                            key={`vilHaMote-${index}`}
                            value={svar.verdi}
                            label={svar.tekst}
                            id={`${felt.navn}-${index}`}
                            aria-labelledby={felt.navn}
                        />
                    );
                })
            }
        </Field>
    </div>);
};
VilHaMoteSvarKnapper.propTypes = {
    felt: felterPt,
};

export const MotebehovSkjemaTekstomraade = (
    {
        felt,
        harMotebehov,
    }) => {
    const sporsmaalTekst = harMotebehov === 'true'
        ? `${felt.spoersmaal} (valgfritt)`
        : felt.spoersmaal;
    return (<div className="skjema_element motebehovSkjemaTekstomraade">
        <h3
            className="skjemaelement__sporsmal"
            id={felt.navn}
        >
            {sporsmaalTekst}
        </h3>
        <TekstSensitiv />
        <Field
            className="input--fullbredde"
            name={felt.navn}
            id={`${felt.navn}-input`}
            aria-labelledby={felt.navn}
            maxLength={MAX_LENGTH}
            component={Tekstomraade}
            placeholder={'Skriv her'}
            rows="5"
        />
    </div>);
};
MotebehovSkjemaTekstomraade.propTypes = {
    felt: felterPt,
    harMotebehov: PropTypes.string,
};

export const TekstSensitiv = () => {
    return (<div className="svarMotebehovSkjema__tekstSensitiv">
        {tekster.sensitiv}
    </div>);
};
export const TekstOpplysning = () => {
    const teksterOpplysning = {
        tekstOpplysning: {
            tekst: 'Vi bruker opplysningene også til å gjøre selve tjeneste bedre. ',
            lenke: 'Les mer om hvordan NAV behandler personopplysninger.',
        },
    };
    return (<div className="svarMotebehovSkjema__tekstOpplysning">
        <p>
            {teksterOpplysning.tekstOpplysning.tekst}
            <a
                className="lenke"
                href="http://www.nav.no/personvern"
                title="Følg lenke">
                {teksterOpplysning.tekstOpplysning.lenke}
            </a>
        </p>
    </div>);
};

export const AlertstripeNei = () => {
    return (<Alertstripe className="alertstripeNei" type="info">
        {tekster.svarNeiAlert}
    </Alertstripe>);
};

export class SvarMotebehovSkjemaKomponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.svarMotebehov(values, this.props.sykmeldt);
    }

    render() {
        const {
            harMotebehov,
            motebehovSvarReducer,
            handleSubmit,
        } = this.props;
        return (<form
            className="svarMotebehovSkjema"
            onSubmit={handleSubmit(this.handleSubmit)}>
            <ObligatoriskeFelterInfotekst />
            <div className="panel">
                <VilHaMoteSvarKnapper felt={FELTER.harMotebehov} />

                { harMotebehov === 'false' &&
                    <AlertstripeNei />
                }
                <MotebehovSkjemaTekstomraade
                    felt={FELTER.forklaring}
                    harMotebehov={harMotebehov}
                />
                <MotebehovSkjemaKnapper sender={motebehovSvarReducer.sender} />
            </div>

            <TekstOpplysning />
        </form>);
    }
}

SvarMotebehovSkjemaKomponent.propTypes = {
    harMotebehov: PropTypes.string,
    handleSubmit: PropTypes.func,
    sykmeldt: sykmeldtPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
    svarMotebehov: PropTypes.func,
};

const validate = (values) => {
    const feilmeldinger = {};

    if (!values.harMotebehov) {
        feilmeldinger.harMotebehov = 'Velg alternativ';
    }

    if (values.harMotebehov === 'false') {
        if ((!values.forklaring || values.forklaring.trim().length === 0)) {
            feilmeldinger.forklaring = 'Fyll inn tekst';
        } else if (values.forklaring.match(tekstfeltRegex)) {
            feilmeldinger.forklaring = 'Ugyldig spesialtegn er oppgitt';
        }
    }
    const forklaringLengde = values.forklaring ? values.forklaring.length : 0;
    if (forklaringLengde > MAX_LENGTH) {
        feilmeldinger.forklaring = `Maks ${MAX_LENGTH} tegn tillatt`;
    }
    return feilmeldinger;
};

const mapStateToProps = (state) => {
    const values = getFormValues(SVAR_MOTEBEHOV_SKJEMANAVN)(state) || {};
    return {
        harMotebehov: values.harMotebehov,
    };
};

const SvarMotebehovSkjema = reduxForm({
    form: SVAR_MOTEBEHOV_SKJEMANAVN,
    validate,
})(SvarMotebehovSkjemaKomponent);

const Skjema = connect(mapStateToProps)(SvarMotebehovSkjema);

export default Skjema;
