import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
    FieldArray,
    reduxForm,
} from 'redux-form';
import styled from 'styled-components';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Utvidbar } from '@navikt/digisyfo-npm';
import Ikon from 'nav-frontend-ikoner-assets';
import {
    motePt,
    motebehovReducerPt,
} from '../../../propTypes';
import {
    SVARSKJEMANAVN,
    getNyeAlternativer,
    getTidligereAlternativer,
} from '../../../utils/moteplanleggerUtils';
import { ARBEIDSGIVER } from '../../../enums/moteplanleggerDeltakerTyper';
import Motested from './Motested';
import Alternativer from './Alternativer';
import BesvarteTidspunkter from './BesvarteTidspunkter';
import DeclinedMotebehov from './DeclinedMotebehov';
import { skalViseMotebehovForSykmeldt } from '../../../utils/motebehovUtils';

/* eslint-disable max-len */
const texts = {
    error: 'Beklager, det oppstod en feil!',
    submitButton: 'Send svar',
    personvern: 'Ifølge folketrygdloven kan NAV innkalle deg og arbeidstakeren din til dialogmøte for å drøfte mulighetene for å komme tilbake til jobb. Her kan du svare på hvilke tidspunkter som passer for deg.',
    personvernHref: 'https://www.nav.no/personvern',
    konklusjon: `
        Vi har konkludert med at det bør holdes dialogmøte selv om du tidligere har svart nei på behovet. 
        Vi har sett på svarene fra deg og arbeidstakeren din og på andre opplysninger vi har om sykefraværet.
    `,
    husk: 'Husk at NAV skal ha mottatt en oppfølgingsplan senest en uke før møtet.',
    cancel: 'Avbryt',
};
/* eslint-enable max-len */

export function getData(values) {
    return values.alternativer.map((alternativ) => {
        if (alternativ
            && typeof alternativ.verdi === 'number'
            && alternativ.avkrysset === true
        ) {
            return alternativ.verdi;
        }
        return undefined;
    }).filter((id) => {
        return id !== undefined;
    });
}

const PrivacyInfo = styled.div`
    padding: 1rem;
    margin-bottom: 1rem;
`;

const AlertInfo = styled.div`
    display: flex;
    align-items: center;
`;

const AlertText = styled.span`
    padding-left: 0.5em;
    font-weight: bold;
`;

const CancelButton = styled.div`
    text-decoration: underline;
`;

export const Skjema = (
    {
        handleSubmit,
        mote,
        sendSvar,
        sender,
        sendingFeilet,
        touch,
        autofill,
        motebehovReducer,
    }) => {
    const deltakertype = ARBEIDSGIVER;

    const deltaker = mote.deltakere.filter((d) => {
        return d.type === deltakertype;
    })[0];
    const onSubmit = (values) => {
        const data = getData(values);
        sendSvar(mote.moteUuid, deltakertype, data);
    };
    const tidligereAlternativer = getTidligereAlternativer(mote, deltakertype);

    const previous = () => {
        const truncatedPath = window.location.pathname.split('/mote')[0];

        if (skalViseMotebehovForSykmeldt(motebehovReducer)) {
            return truncatedPath;
        }

        return truncatedPath.replace(/dialogmotearbeidsgiver/, 'sykefravaerarbeidsgiver');
    };

    const displayDeclinedMotebehov = motebehovReducer.data
        && motebehovReducer.data.motebehov
        && motebehovReducer.data.motebehov.motebehovSvar.harMotebehov === false;

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <PrivacyInfo>
            <p>{texts.personvern}</p>
            <p className="svarskjema__intro">
                <a target="_blank" rel="noopener noreferrer" href={texts.personvernHref}>{texts.lenke}</a>
            </p>
        </PrivacyInfo>

        {displayDeclinedMotebehov && <DeclinedMotebehov />}

        <div className="tidOgSted">
            <div className="panel tidOgSted__sted">
                <Motested sted={deltaker.svar[0].sted} />
            </div>
            <div className="panel tidOgSted__alternativer">
                <FieldArray
                    name="tidspunkter"
                    deltakertype={deltakertype}
                    component={Alternativer}
                    alternativer={getNyeAlternativer(mote, deltakertype)}
                    mote={mote}
                    touch={touch}
                    autofill={autofill}
                />
                <AlertInfo>
                    <Ikon kind="info-sirkel-fyll" />
                    <AlertText>
                        {texts.husk}
                    </AlertText>
                </AlertInfo>
            </div>
        </div>
        {tidligereAlternativer.length > 0 &&
        <Utvidbar
            tittel="Tidligere foreslåtte tidspunkter"
            className="blokk"
            visLukklenke={false}>
            <BesvarteTidspunkter
                alternativer={tidligereAlternativer}
                mote={mote}
            />
        </Utvidbar>
        }
        <div aria-live="polite" role="alert">
            {sendingFeilet &&
            <Alertstripe type="advarsel">
                <p className="sist">{texts.error}</p>
            </Alertstripe>
            }
        </div>
        <div className="knapperad">
            <Hovedknapp
                className="js-submit"
                htmlType="submit"
                disabled={sender}
                spinner={sender}>
                {texts.submitButton}
            </Hovedknapp>
        </div>
        <div className="knapperad">
            <CancelButton>
                <Link href={previous()}>{texts.cancel}</Link>
            </CancelButton>
        </div>
    </form>);
};


Skjema.propTypes = {
    handleSubmit: PropTypes.func,
    mote: motePt,
    motebehovReducer: motebehovReducerPt,
    sendSvar: PropTypes.func,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    touch: PropTypes.func,
    autofill: PropTypes.func,
};

const harValgtIngen = (values) => {
    return values.alternativer.filter((alternativ) => {
        return alternativ
            && alternativ.verdi === 'ingen'
            && alternativ.avkrysset === true;
    }).length > 0;
};

const harValgtDato = (values) => {
    return values.alternativer.filter((alternativ) => {
        return alternativ
            && alternativ.verdi !== 'ingen'
            && alternativ.avkrysset === true;
    }).length > 0;
};

export function validate(values) {
    const feilmeldinger = {};
    const alternativer = values.alternativer || [];
    const antallAvkryssede = alternativer.filter((alternativ) => {
        return alternativ && alternativ.avkrysset === true;
    }).length;
    if (!values.alternativer || antallAvkryssede === 0) {
        feilmeldinger.tidspunkter = {
            _error: 'Du må velge minst ett alternativ',
        };
    } else if (harValgtIngen(values) && harValgtDato(values)) {
        feilmeldinger.tidspunkter = {
            _error: 'Du har valgt alternativer som utelukker hverandre',
        };
    }
    return feilmeldinger;
}

const Svarskjema = reduxForm({
    form: SVARSKJEMANAVN,
    validate,
})(Skjema);

export default Svarskjema;
