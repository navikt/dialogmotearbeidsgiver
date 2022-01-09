import AlertStripe from 'nav-frontend-alertstriper';
import React from 'react';
import styled from 'styled-components';
import BesvarteTidspunkter from '../../../../components/dialogmoter/dialogmoteplanlegger/BesvarteTidspunkter';
import { ARBEIDSGIVER } from '../../../../enums/moteplanleggerDeltakerTyper';
import { motePt } from '../../../../propTypes';
import { finnDeltakerByType } from '../../../../utils/moteplanleggerUtils';

const texts = {
  title: 'Svaret ditt på tidspunkt for dialogmøte',
  motested: 'Møtested:',
  infoTitle: 'Du har krysset av på at ingen av tidspunktene passer.',
  infoPunkt1:
    'NAV kan likevel innkalle deg til et av tidspunktene hvis fraværsgrunnen din ikke blir vurdert som gyldig.',
  infoPunkt2: 'Du kan også få nye tidspunkter å velge mellom hvis det er aktuelt.',
  infoKontakt: 'Har du behov for kontakt med NAV, kan du ringe oss på 55 55 33 33',
};

const AlertstripeStyled = styled(AlertStripe)`
  margin-top: 1rem;
`;

const SvarKvittering = ({ mote }) => {
  const deltaker = finnDeltakerByType(mote.deltakere, ARBEIDSGIVER);
  const harDeltakerIkkeValgtSvar =
    deltaker.svar.filter((svar) => {
      return svar.valgt;
    }).length === 0;

  return (
    <React.Fragment>
      <h2>{texts.title}</h2>
      {harDeltakerIkkeValgtSvar && (
        <React.Fragment>
          <AlertstripeStyled type="info">
            {texts.infoTitle}
            <ul>
              <li>{texts.infoPunkt1}</li>
              <li>{texts.infoPunkt2}</li>
            </ul>
            {texts.infoKontakt}
          </AlertstripeStyled>
        </React.Fragment>
      )}
      <h3>{texts.motested}</h3>
      <p>{deltaker.svar[0].sted}</p>
      <BesvarteTidspunkter mote={mote} alternativer={mote.alternativer} />
    </React.Fragment>
  );
};

SvarKvittering.propTypes = {
  mote: motePt,
};

export default SvarKvittering;
