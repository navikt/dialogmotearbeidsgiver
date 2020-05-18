import React from 'react';
import PropTypes from 'prop-types';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { motebehovReducerPt } from '../../../propTypes';
import { FELTER } from './svarbehov/SvarMotebehovSkjema';
import { tilLesbarDatoMedArstallOgUkedag } from '../../../utils/datoUtils';

const tekster = {
    motebehovKvittering: {
        tittel: 'Svaret ditt er sendt',
        tekst: 'Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte. Hører du fra oss, mener vi det er behov for å møtes.',
    },
    motebehovKvitteringUtvidbar: {
        tittel: 'Se ditt svar',
    },
};

const getHarBehovKvittering = (harBehovSvar, harBehovSporsmal) => {
    return harBehovSporsmal
        ? [
            <h5 className="skjemaelement__sporsmal" key={0}>{FELTER.harMotebehov.spoersmaal}</h5>,
            <p key={1}>
                {harBehovSvar}
            </p>,
        ]
        : [
            <p key={1}>
                {harBehovSvar}
            </p>,
        ];
};

const MotebehovKvitteringUtvidbar = (
    {
        motebehov,
        harBehovSporsmal,
        harBehovSvar,
    }) => {
    const motebehovet = motebehov.data.motebehov;
    const motebehovSvar = motebehovet.motebehovSvar;
    return (<Utvidbar
        className="motebehovKvitteringUtvidbar"
        tittel={tekster.motebehovKvitteringUtvidbar.tittel}>
        <div>
            { motebehovet.opprettetDato &&
            <h4>{tilLesbarDatoMedArstallOgUkedag(motebehovet.opprettetDato)}</h4>
            }

            { motebehovSvar.harMotebehov !== undefined && getHarBehovKvittering(harBehovSvar, harBehovSporsmal) }

            { motebehovSvar.forklaring && [
                <h5 className="skjemaelement__sporsmal" key={0}>
                    {FELTER.forklaring.spoersmaal}
                </h5>,
                <p key={1}>{motebehovSvar.forklaring}</p>,
            ]}
        </div>
    </Utvidbar>);
};
MotebehovKvitteringUtvidbar.propTypes = {
    motebehov: motebehovReducerPt,
    harBehovSporsmal: PropTypes.string,
    harBehovSvar: PropTypes.string,
};

export default MotebehovKvitteringUtvidbar;
