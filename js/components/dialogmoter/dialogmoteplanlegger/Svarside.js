import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import Svarskjema from './Svarskjema';
import { motePt } from '../../../propTypes';
import { BEKREFTET, finnNyesteAlternativ } from '../../../utils/moteplanleggerUtils';
import { visKortDato } from '../../../utils/datoUtils';

const texts = {
  title: 'Tidspunkt for dialogmøte',
  info: 'Du har blitt tilsendt nye tidspunkter for dialogmøte',
};

const getTextConfirmation = (mote) => {
  const dateBekreftet = visKortDato(finnNyesteAlternativ(mote.alternativer).created);
  return `Sendt: ${dateBekreftet}`;
};

const Svarside = (props) => {
  const { mote } = props;

  return (
    <div>
      <header className="sidetopp">
        <h1 className="sidetopp__tittel">{texts.title}</h1>
      </header>
      {mote.status === BEKREFTET && (
        <div className="blokk">
          <Alertstripe type="info">
            <p className="uthevet">{texts.info}</p>
            <span>{getTextConfirmation(mote)}</span>
          </Alertstripe>
        </div>
      )}
      <Svarskjema {...props} />
    </div>
  );
};

Svarside.propTypes = {
  mote: motePt,
};

export default Svarside;
