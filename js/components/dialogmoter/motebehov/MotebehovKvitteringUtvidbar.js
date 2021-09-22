import React from 'react';
import PropTypes from 'prop-types';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { motebehovReducerPt } from '../../../propTypes';
import { FELTER } from './svarbehov/SvarMotebehovSkjema';
import { FELTER as MELDMOTEBEHOV_FELTER } from './meldbehov/MeldMotebehovSkjema';
import { tilLesbarDatoMedArstallOgUkedag } from '../../../utils/datoUtils';

const tekster = {
  motebehovKvitteringUtvidbar: {
    tittel: 'Se svaret ditt',
  },
};

export const getHarBehovKvittering = (harBehovSvar, harBehovSporsmal) => {
  return harBehovSporsmal
    ? [
        <h5 className="skjemaelement__sporsmal" key={0}>
          {FELTER.harMotebehov.spoersmaal}
        </h5>,
        <p key={1}>{harBehovSvar}</p>,
      ]
    : [<p key={1}>{harBehovSvar}</p>];
};

export const KvitteringForklaring = (forklaring) => {
  const baseLegeRequestTekst = MELDMOTEBEHOV_FELTER.lege.tekst.replace(' (valgfri)', '');
  const isLegeRequestPresent = forklaring.includes(baseLegeRequestTekst);
  const label = <h5 className="skjemaelement__sporsmal">{FELTER.forklaring.spoersmaal}</h5>;
  if (isLegeRequestPresent) {
    return (
      <React.Fragment>
        <p>{MELDMOTEBEHOV_FELTER.lege.tekst}</p>
        {label}
        <p>{forklaring.replace(baseLegeRequestTekst, '').trim()}</p>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {label}
      <p>{forklaring}</p>
    </React.Fragment>
  );
};

const MotebehovKvitteringUtvidbar = ({ motebehov, harBehovSporsmal, harBehovSvar }) => {
  const motebehovet = motebehov.data.motebehov;
  const motebehovSvar = motebehovet.motebehovSvar;
  return (
    <Utvidbar className="motebehovKvitteringUtvidbar" tittel={tekster.motebehovKvitteringUtvidbar.tittel}>
      <div>
        {motebehovet.opprettetDato && <h4>{tilLesbarDatoMedArstallOgUkedag(motebehovet.opprettetDato)}</h4>}

        {motebehovSvar.harMotebehov !== undefined && getHarBehovKvittering(harBehovSvar, harBehovSporsmal)}

        {motebehovSvar.forklaring && KvitteringForklaring(motebehovSvar.forklaring)}
      </div>
    </Utvidbar>
  );
};
MotebehovKvitteringUtvidbar.propTypes = {
  motebehov: motebehovReducerPt,
  harBehovSporsmal: PropTypes.string,
  harBehovSvar: PropTypes.string,
};

export default MotebehovKvitteringUtvidbar;
