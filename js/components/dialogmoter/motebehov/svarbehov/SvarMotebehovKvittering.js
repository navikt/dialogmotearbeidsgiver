import React from 'react';
import { motebehovReducerPt } from '../../../../propTypes';
import { FELTER } from './SvarMotebehovSkjema';
import MotebehovKvitteringUtvidbar from '../MotebehovKvitteringUtvidbar';

const tekster = {
  motebehovKvittering: {
    tittel: 'Svaret ditt er sendt',
    tekst:
      'Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte. Hører du fra oss, mener vi det er behov for å møtes.',
  },
};

const SvarMotebehovKvittering = ({ motebehov }) => {
  return (
    <div className="panel motebehovKvittering">
      <h2 className="motebehovKvittering_tittel">{tekster.motebehovKvittering.tittel}</h2>

      <p>{tekster.motebehovKvittering.tekst}</p>

      <MotebehovKvitteringUtvidbar
        motebehov={motebehov}
        harBehovSporsmal={FELTER.harMotebehov.spoersmaal}
        harBehovSvar={`${
          motebehov.data.motebehov.motebehovSvar.harMotebehov
            ? FELTER.harMotebehov.svar[0].tekst
            : FELTER.harMotebehov.svar[1].tekst
        }`}
      />
    </div>
  );
};
SvarMotebehovKvittering.propTypes = {
  motebehov: motebehovReducerPt,
};

export default SvarMotebehovKvittering;
