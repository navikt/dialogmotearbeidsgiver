import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AlertStripe from 'nav-frontend-alertstriper';
import { motebehovReducerPt } from '../../../../propTypes';
import { FELTER } from './MeldMotebehovSkjema';
import MotebehovKvitteringUtvidbar from '../MotebehovKvitteringUtvidbar';
import { hentOppfolgingsplanarbeidsgiverUrl } from '../../../../utils/urlUtils';

const tekster = {
    motebehovKvittering: {
        tittel: 'Svaret ditt er sendt',
        tekst1: 'Du har sendt beskjed til NAV om at du ønsker et dialogmøte.',
        tekst2: 'En veileder ved NAV-kontoret vil ta kontakt med deg.',
    },
    motebehovKvitteringUtvidbar: {
        tittel: 'Se svaret ditt',
    },
    alertstripe: 'Husk å dele oppfølgingsplanen med NAV før møtet.',
    oppfolgingsplanlink: 'Gå til oppfølgingsplanen.',
};

const AlertstripeStyled = styled(AlertStripe)`
    margin-top: 1rem;
`;

const MeldMotebehovKvittering = (
    {
        motebehov,
        koblingId,
    }) => {
    return (
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

            <p>
                {tekster.motebehovKvittering.tekst1}
                <br />
                {tekster.motebehovKvittering.tekst2}
            </p>

            <MotebehovKvitteringUtvidbar
                motebehov={motebehov}
                harBehovSvar={FELTER.harMotebehov.svar.tekst}
            />

            <AlertstripeStyled type="info">
                {tekster.alertstripe}
                <br />
                <a className="lenke" href={hentOppfolgingsplanarbeidsgiverUrl(koblingId)}>
                    {tekster.oppfolgingsplanlink}
                </a>
            </AlertstripeStyled>
        </div>
    );
};
MeldMotebehovKvittering.propTypes = {
    koblingId: PropTypes.number,
    motebehov: motebehovReducerPt,
};

export default MeldMotebehovKvittering;
