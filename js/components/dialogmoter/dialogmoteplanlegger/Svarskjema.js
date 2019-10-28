import React from 'react';
import PropTypes from 'prop-types';
import {
    FieldArray,
    reduxForm,
} from 'redux-form';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    getLedetekst,
    getHtmlLedetekst,
    Utvidbar,
} from '@navikt/digisyfo-npm';
import Ikon from 'nav-frontend-ikoner-assets';
import {
    motePt,
    moteplanleggerDeltakertypePt,
    motebehovReducerPt,
} from '../../../propTypes';
import {
    SVARSKJEMANAVN,
    getNyeAlternativer,
    getTidligereAlternativer,
} from '../../../utils/moteplanleggerUtils';
import { BRUKER } from '../../../enums/moteplanleggerDeltakerTyper';
import Motested from './Motested';
import Alternativer from './Alternativer';
import BesvarteTidspunkter from './BesvarteTidspunkter';
import MinstEttTidspunktContainer from './MinstEttTidspunkt';
import DeclinedMotebehov from './DeclinedMotebehov';

export const hentPersonvernTekst = (deltakertype) => {
    const personvernTekstNokkel = deltakertype === BRUKER
        ? 'mote.moteInfoPersonvern.at'
        : 'mote.moteInfoPersonvern.ag';
    return getHtmlLedetekst(personvernTekstNokkel);
};

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

const texts = {
    konklusjon: `
        Vi har konkludert med at det bør holdes dialogmøte selv om du tidligere har svart nei på behovet. 
        Vi har sett på svarene fra deg og arbeidstakeren din og på andre opplysninger vi har om sykefraværet.
    `,
    husk: 'Husk at NAV skal ha mottatt en oppfølgingsplan senest en uke før møtet.',
    cancel: 'Avbryt',
};

export const Skjema = (
    {
        handleSubmit,
        mote,
        sendSvar,
        sender,
        sendingFeilet,
        touch,
        autofill,
        deltakertype = BRUKER,
        motebehovReducer,
    }) => {
    const deltaker = mote.deltakere.filter((d) => {
        return d.type === deltakertype;
    })[0];
    const onSubmit = (values) => {
        const data = getData(values);
        sendSvar(mote.moteUuid, deltakertype, data);
    };
    const tidligereAlternativer = getTidligereAlternativer(mote, deltakertype);

    const previous = () => {
        const oldPath = window.location.pathname.split('/');
        const newPath = oldPath.slice(0, oldPath.length - 1).join('/');
        return newPath;
    };

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ padding: '1em' }}>
            <p
                className="svarskjema__intro"
                dangerouslySetInnerHTML={hentPersonvernTekst(deltakertype)}
            /></div>

        {motebehovReducer && <DeclinedMotebehov motebehovReducer={motebehovReducer} />}
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
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Ikon kind="info-sirkel-fyll" />
                    <span style={{
                        paddingLeft: '0.5em',
                        fontWeight: 'bold',
                    }}>
                        {texts.husk}
                    </span>
                </div>
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
        {deltakertype === BRUKER && <MinstEttTidspunktContainer />}
        <div aria-live="polite" role="alert">
            {sendingFeilet &&
            <Alertstripe type="advarsel">
                <p className="sist">{getLedetekst('mote.skjema.innsending.feilet')}</p>
            </Alertstripe>
            }
        </div>
        <div className="knapperad">
            <Hovedknapp
                className="js-submit"
                htmlType="submit"
                disabled={sender}
                spinner={sender}>
                {getLedetekst('mote.skjema.send-svar-knapp')}
            </Hovedknapp>
            <div>
                <a href={previous()}>{texts.cancel}</a>
            </div>
        </div>
    </form>);
};


Skjema.propTypes = {
    handleSubmit: PropTypes.func,
    mote: motePt,
    motebehovReducer: motebehovReducerPt,
    sendSvar: PropTypes.func,
    deltakertype: moteplanleggerDeltakertypePt,
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
