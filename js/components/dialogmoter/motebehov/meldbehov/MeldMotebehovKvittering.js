import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AlertStripe from 'nav-frontend-alertstriper';
import { motebehovReducerPt } from '../../../../propTypes';
import { FELTER } from './MeldMotebehovSkjema';
import MotebehovKvitteringUtvidbar from '../MotebehovKvitteringUtvidbar';
import { getOppfolgingsplanerUrl } from '@/MVP/globals/paths';

const tekster = {
  motebehovKvittering: {
    tittel: 'Svaret ditt er sendt',
    tekst1: 'Du har sendt beskjed til NAV om at du ønsker et dialogmøte.',
    tekst2: 'En veileder ved NAV-kontoret vil ta kontakt med deg.',
  },
  alertstripe: 'Husk å dele oppfølgingsplanen med NAV før møtet.',
  oppfolgingsplanlink: 'Gå til oppfølgingsplanen.',
};

const AlertstripeStyled = styled(AlertStripe)`
  margin-top: 1rem;
`;

const MeldMotebehovKvittering = ({ motebehov, narmestelederId }) => {
  return (
    <div className="panel motebehovKvittering">
      <h2 className="motebehovKvittering_tittel">{tekster.motebehovKvittering.tittel}</h2>

      <p>
        {tekster.motebehovKvittering.tekst1}
        <br />
        {tekster.motebehovKvittering.tekst2}
      </p>

      <MotebehovKvitteringUtvidbar motebehov={motebehov} harBehovSvar={FELTER.harMotebehov.svar.tekst} />

      <AlertstripeStyled type="info">
        {tekster.alertstripe}
        <br />
        <a className="lenke" href={getOppfolgingsplanerUrl(narmestelederId)}>
          {tekster.oppfolgingsplanlink}
        </a>
      </AlertstripeStyled>
    </div>
  );
};
MeldMotebehovKvittering.propTypes = {
  narmestelederId: PropTypes.string,
  motebehov: motebehovReducerPt,
};

export default MeldMotebehovKvittering;
