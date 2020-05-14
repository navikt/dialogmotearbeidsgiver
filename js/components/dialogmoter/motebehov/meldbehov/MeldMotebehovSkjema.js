import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    motebehovSvarReducerPt,
    sykmeldt as sykmeldtPt,
} from '../../../../propTypes';
import Tekstomraade from '../../../skjema/Tekstomraade';
import CheckboxSelvstendig from '../../../skjema/CheckboxSelvstendig';

export const tekstfeltRegex = new RegExp('.*<[^ ][^>]+[^ ]>.*');

export const felterPt = PropTypes.shape({});

const SVAR_MOTEBEHOV_SKJEMANAVN = 'svarMotebehov';

const tekster = {
    knappSend: 'Send svar',
    sensitiv: 'Ikke skriv sensitiv informasjon, for eksempel om den ansattes helse.',
};

const MAX_LENGTH = 1000;

export const FELTER = {
    harMotebehov: {
        navn: 'harMotebehov',
        svar: {
            tekst: 'Jeg har behov for et møte med NAV',
            verdi: true,
        },
    },
    forklaring: {
        navn: 'forklaring',
        spoersmaal: 'Begrunnelse',
    },
};
export const getHarMotebehovText = (arbeidstakerName) => {
    if (arbeidstakerName && arbeidstakerName !== '') {
        return `${FELTER.harMotebehov.svar.tekst} og ${arbeidstakerName}`;
    }
    return `${FELTER.harMotebehov.svar.tekst} og den ansatte.`;
};

export const MotebehovSkjemaTekstomraade = (
    {
        felt,
    }) => {
    const sporsmaalTekst = `${felt.spoersmaal} (valgfritt)`;
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

export class MeldMotebehovSkjemaKomponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.svarMotebehov(values, this.props.sykmeldt);
    }

    render() {
        const {
            sykmeldt,
            motebehovSvarReducer,
            handleSubmit,
        } = this.props;
        return (<form
            className="svarMotebehovSkjema"
            onSubmit={handleSubmit(this.handleSubmit)}>
            <div className="panel">
                <Field
                    id={FELTER.harMotebehov.navn}
                    name={FELTER.harMotebehov.navn}
                    component={CheckboxSelvstendig}
                    label={getHarMotebehovText(sykmeldt.navn)}
                />
                <MotebehovSkjemaTekstomraade
                    felt={FELTER.forklaring}
                />
            </div>

            <TekstOpplysning />

            <Knapper motebehovSvarReducer={motebehovSvarReducer.sender} />
        </form>);
    }
}

MeldMotebehovSkjemaKomponent.propTypes = {
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
    const isForklaringPresent = values.forklaring && values.forklaring.trim().length > 0;
    if (isForklaringPresent && values.forklaring.match(tekstfeltRegex)) {
        feilmeldinger.forklaring = 'Ugyldig spesialtegn er oppgitt';
    }
    const forklaringLengde = values.forklaring ? values.forklaring.length : 0;
    if (forklaringLengde > MAX_LENGTH) {
        feilmeldinger.forklaring = `Maks ${MAX_LENGTH} tegn tillatt`;
    }
    return feilmeldinger;
};

const MeldMotebehovSkjema = reduxForm({
    form: SVAR_MOTEBEHOV_SKJEMANAVN,
    validate,
})(MeldMotebehovSkjemaKomponent);

const Skjema = connect()(MeldMotebehovSkjema);

export default Skjema;
