import React from 'react';
import { Link } from 'react-router';
import {
    getLedetekst,
    Utvidbar,
} from '@navikt/digisyfo-npm';
import { motebehovReducerPt } from '../../propTypes';
import { FELTER } from './SvarMotebehovSkjema';
import { tilLesbarDatoMedArstallOgUkedag } from '../../utils/datoUtils';

const tekster = {
    motebehovKvittering: {
        tittel: 'Svaret ditt er sendt',
        tekst: 'Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte. Hører du fra oss, mener vi det er behov for å møtes.',
    },
    motebehovKvitteringUtvidbar: {
        tittel: 'Se ditt svar',
    },
};

export const MotebehovKvitteringUtvidbar = (
    {
        motebehov,
    }) => {
    const motebehovet = motebehov.data[0];
    const motebehovSvar = motebehovet.motebehovSvar;
    return (<Utvidbar
        className="motebehovKvitteringUtvidbar"
        tittel={tekster.motebehovKvitteringUtvidbar.tittel}>
        <div>
            { motebehovet.opprettetDato &&
                <h4>{tilLesbarDatoMedArstallOgUkedag(motebehovet.opprettetDato)}</h4>
            }

            { motebehovSvar.harMotebehov !== undefined && [
                <h5 className="skjemaelement__sporsmal" key={0}>
                    {getLedetekst(FELTER.harMotebehov.spoersmaal)}
                </h5>,
                <p key={1}>
                    {`${motebehovSvar.harMotebehov
                        ? getLedetekst(FELTER.harMotebehov.svar[0].tekst)
                        : getLedetekst(FELTER.harMotebehov.svar[1].tekst)
                    }`}
                </p>,
            ]}

            { motebehovSvar.forklaring && [
                <h5 className="skjemaelement__sporsmal" key={0}>
                    {getLedetekst(FELTER.forklaring.spoersmaal)}
                </h5>,
                <p key={1}>{motebehovSvar.forklaring}</p>,
            ]}
        </div>
    </Utvidbar>);
};
MotebehovKvitteringUtvidbar.propTypes = {
    motebehov: motebehovReducerPt,
};

const MotebehovKvittering = (
    {
        motebehov,
    }) => {
    return (<div>
        <div className="panel motebehovKvittering">
            <div className="illustrertTittel">
                <img
                    className="illustrertTittel__img"
                    src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/hake-groenn--lys.svg`}
                    alt="hake"
                />
                <h2 className="illustrertTittel__tittel">
                    {tekster.motebehovKvittering.tittel}
                </h2>
            </div>

            <p>{tekster.motebehovKvittering.tekst}</p>

            <MotebehovKvitteringUtvidbar motebehov={motebehov} />
        </div>
        <div className="knapperad">
            <Link className="lenke" to={window.location.href.split('/behov')[0]}>
                Tilbake
            </Link>
        </div>
    </div>);
};
MotebehovKvittering.propTypes = {
    motebehov: motebehovReducerPt,
};

export default MotebehovKvittering;
