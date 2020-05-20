import React from 'react';
import { Link } from 'react-router';
import { motebehovReducerPt } from '../../../../propTypes';
import { FELTER } from './SvarMotebehovSkjema';
import MotebehovKvitteringUtvidbar from '../MotebehovKvitteringUtvidbar';

const tekster = {
    motebehovKvittering: {
        tittel: 'Svaret ditt er sendt',
        tekst: 'Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte. Hører du fra oss, mener vi det er behov for å møtes.',
    },
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

            <MotebehovKvitteringUtvidbar
                motebehov={motebehov}
                harBehovSporsmal={FELTER.harMotebehov.spoersmaal}
                harBehovSvar={`${motebehov.data.motebehov.motebehovSvar.harMotebehov
                    ? FELTER.harMotebehov.svar[0].tekst
                    : FELTER.harMotebehov.svar[1].tekst
                }`}
            />
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
