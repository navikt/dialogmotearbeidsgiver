import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    motebehovSvarReducerPt,
    sykmeldt as sykmeldtPt,
} from '../../propTypes';
import Tekstomraade from '../skjema/Tekstomraade';
import Radioknapper from '../skjema/Radioknapper';

export const tekstfeltRegex = new RegExp('.*<[^ ][^>]+[^ ]>.*');

export const felterPt = PropTypes.shape({});

const SVAR_MOTEBEHOV_SKJEMANAVN = 'svarMotebehov';

const tekster = {
    knappSend: 'Send svar',
    sensitiv: 'Ikke skriv sensitiv informasjon, for eksempel om den ansattes helse.',
};

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

export const Knapper = (
    {
        sender,
    }) => {
    return (<div>
        <div className="knapperad">
            <Hovedknapp
                type="submit"
                disabled={sender}
                spinner={sender}
            >
                {tekster.knappSend}
            </Hovedknapp>
        </div>
        <div className="knapperad">
            <Link className="lenke" to={window.location.href.split('/behov')[0]}>
                Avbryt
            </Link>
        </div>
    </div>);
};
Knapper.propTypes = {
    sender: PropTypes.bool,
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
            <div className="panel">
                <VilHaMoteSvarKnapper felt={FELTER.harMotebehov} />
                <MotebehovSkjemaTekstomraade
                    felt={FELTER.forklaring}
                    harMotebehov={harMotebehov}
                />
            </div>

            <TekstOpplysning />

            <Knapper motebehovSvarReducer={motebehovSvarReducer.sender} />
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
    const maksTekstLengde = 1000;

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
    if (forklaringLengde > maksTekstLengde) {
        feilmeldinger.forklaring = `Maks ${maksTekstLengde} tegn tillatt`;
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
