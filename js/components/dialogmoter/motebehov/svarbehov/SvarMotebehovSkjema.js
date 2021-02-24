import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import history from '../../../../history';
import Alertstripe from 'nav-frontend-alertstriper';
import { Feiloppsummering } from 'nav-frontend-skjema';
import formValueSelector from 'redux-form/lib/formValueSelector';
import {
    motebehovSvarReducerPt,
    sykmeldt as sykmeldtPt,
} from '../../../../propTypes';
import Tekstomraade from '../../../skjema/Tekstomraade';
import Radioknapper from '../../../skjema/Radioknapper';
import MotebehovSkjemaKnapper from '../MotebehovSkjemaKnapper';
import ObligatoriskeFelterInfotekst from '../ObligatoriskeFelterInfotekst';

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
        id: 'harMotebehov-input',
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
        id: 'forklaring-input',
        spoersmaal: 'Begrunnelse',
    },
};

export const VilHaMoteSvarKnapper = (
    {
        felt,
        isFormSubmitted,
        validateHarMoteBehov,
    }) => {
    return (<div className="skjemaelement">
        <h3
            className="skjemaelement__sporsmal"
            id={felt.navn}
        >
            {felt.spoersmaal}
        </h3>
        <Field
            id={felt.id}
            name={felt.navn}
            component={Radioknapper}
            validate={isFormSubmitted ? validateHarMoteBehov : undefined}
        >
            {
                felt.svar.map((svar, index) => {
                    return (
                        <input
                            key={`vilHaMote-${index}`}
                            value={svar.verdi}
                            label={svar.tekst}
                            id={`${felt.id}-${index}`}
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
    isFormSubmitted: PropTypes.bool,
    validateHarMoteBehov: PropTypes.func,
};

export const MotebehovSkjemaTekstomraade = (
    {
        felt,
        harMotebehov,
        isFormSubmitted,
        validateForklaring,
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
        <TekstSensitiv/>
        <Field
            className="input--fullbredde"
            name={felt.navn}
            id={`${felt.id}`}
            aria-labelledby={felt.navn}
            maxLength={MAX_LENGTH}
            component={Tekstomraade}
            placeholder={'Skriv her'}
            rows="5"
            validate={isFormSubmitted && harMotebehov === 'false' ? validateForklaring : undefined}
        />
    </div>);
};
MotebehovSkjemaTekstomraade.propTypes = {
    felt: felterPt,
    harMotebehov: PropTypes.string,
    isFormSubmitted: PropTypes.bool,
    validateForklaring: PropTypes.func,
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
        this.state = {
            errorList: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {harMotebehov, forklaring} = nextProps;
        if (harMotebehov && harMotebehov !== this.props.harMotebehov && this.state.isFormSubmitted) {
            if (harMotebehov === 'false') {
                this.validateHarMoteBehov(harMotebehov);
                this.validateForklaring(forklaring);
            } else if (harMotebehov === 'true') {
                this.validateHarMoteBehov(harMotebehov);
                this.validateForklaring(forklaring);
                this.removeError(FELTER.forklaring.id);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const l = this.getLocation();
        console.log(l)
        if (l && l.indexOf('#') > -1) {
            return false;
        } else {
            return true;
        }
    }

    getLocation = () => {
        return history.location;
    };

    removeError = (id) => {
        const errors = Object.assign(this.state.errorList);
        const i = errors.findIndex(((e) => { return e.skjemaelementId === id; }));

        if (i !== -1) {
            errors.splice(i, 1);
        }

        this.setState({
            errorList: errors,
        });
    };


    handleSubmit(values) {

        const errorObject = {
            harMotebehov: '',
            forklaring: '',
            _error: 'Validering av skjema feilet',
        };

        this.setState({
            isFormSubmitted: true,
        });

        const errorList = [];
        const feilmeldingerObject = this.validateAllFields(values);

        if (feilmeldingerObject.harMotebehov) {
            errorObject.harMotebehov = feilmeldingerObject.harMotebehov;
            errorList.push({skjemaelementId: FELTER.harMotebehov.id + '-0', feilmelding: feilmeldingerObject.harMotebehov});
        }

        if (feilmeldingerObject.forklaring) {
            errorObject.forklaring = feilmeldingerObject.forklaring;
            errorList.push({skjemaelementId: FELTER.forklaring.id, feilmelding: feilmeldingerObject.forklaring});
        }

        if (feilmeldingerObject.harMotebehov || feilmeldingerObject.forklaring) {
            this.setState({
                errorList,
            });

            throw new SubmissionError(errorObject);
        }

        this.setState({
            errorList: [],
        });

        this.props.svarMotebehov(values, this.props.sykmeldt);
    }

    updateFeilOppsummeringState = (feilmelding, elementId) => {
        const i = this.state.errorList.findIndex((obj => obj.skjemaelementId === elementId));
        let errorList = this.state.errorList;

        if (i > -1 && feilmelding === undefined) {
            errorList.splice(i, 1);
            this.setState({
                errorlist: errorList,
            });
        } else if (i === -1 && feilmelding !== undefined) {
            errorList.push({skjemaelementId: elementId, feilmelding: feilmelding});
        }
    };

    validateHarMoteBehov = (value) => {
        let feilmelding = undefined;
        if (!value) {
            feilmelding = 'Velg alternativ';
        }
        this.state.harMotebehov = value;
        this.updateFeilOppsummeringState(feilmelding, FELTER.harMotebehov.id + '-0');
        return feilmelding;
    };

    validateForklaring = (value) => {
        let feilmelding = undefined;
        if (this.state.harMotebehov === 'false') {
            if ((!value || value.trim().length === 0)) {
                feilmelding = 'Fyll inn tekst';
            } else if (value.match(tekstfeltRegex)) {
                feilmelding = 'Ugyldig spesialtegn er oppgitt';
            }
        }

        const forklaringLengde = value ? value.length : 0;
        if (forklaringLengde > MAX_LENGTH) {
            feilmelding = `Maks ${MAX_LENGTH} tegn tillatt`;
        }

        this.updateFeilOppsummeringState(feilmelding, FELTER.forklaring.id);
        return feilmelding;
    };

    validateAllFields = (values) => {
        return {
            harMotebehov: this.validateHarMoteBehov(values.harMotebehov),
            forklaring: this.validateForklaring(values.forklaring),
        };
    };

    render() {
        const {
            harMotebehov,
            motebehovSvarReducer,
            handleSubmit,
        } = this.props;
        return (<form
            className="svarMotebehovSkjema"
            onSubmit={handleSubmit(this.handleSubmit)}>
            <ObligatoriskeFelterInfotekst/>
            <div className="panel">
                <VilHaMoteSvarKnapper
                    felt={FELTER.harMotebehov}
                    validate={this.state.isFormSubmitted ? this.validateHarMoteBehov : undefined}
                />

                {harMotebehov === 'false' &&
                <AlertstripeNei/>
                }
                <MotebehovSkjemaTekstomraade
                    felt={FELTER.forklaring}
                    harMotebehov={harMotebehov}
                    isFormSubmitted={this.state.isFormSubmitted}
                    validateForklaring={this.validateForklaring}
                />
                {this.state.errorList.length > 0 &&
                <Feiloppsummering
                    tittel="For å gå videre må du rette opp følgende:"
                    feil={this.state.errorList}
                />
                }
                <MotebehovSkjemaKnapper sender={motebehovSvarReducer.sender}/>
            </div>

            <TekstOpplysning/>
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

const valueSelector = formValueSelector(SVAR_MOTEBEHOV_SKJEMANAVN);

const mapStateToProps = (state) => {
    return {
        harMotebehov: valueSelector(state, 'harMotebehov'),
        forklaring: valueSelector(state, 'forklaring'),
    };
};

const SvarMotebehovSkjema = reduxForm({
    form: SVAR_MOTEBEHOV_SKJEMANAVN,
})(SvarMotebehovSkjemaKomponent);

const Skjema = connect(mapStateToProps)(SvarMotebehovSkjema);

export default Skjema;
