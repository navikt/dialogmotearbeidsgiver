import React from 'react';
import { motePt } from '../../../propTypes';
import { visDato, visKlokkeslett } from '../../../utils/datoUtils';
import moteAvbruttImage from '../../../../img/svg/mote_avbrutt.svg';

/* eslint-disable max-len */
const texts = {
  title: 'Tidspunkt for dialogmøte',
  subTitle: 'Møte avbrutt',
  blokkIngress: 'Møteforespørsel og tidspunkter det gjelder:',
  tid: 'kl.',
  sted: 'Møtested:',
  sporsmal: 'Har du spørsmål, kan du kontakte oss på 55 55 33 36.',
  forklarende: {
    bekreftet:
      'Du har tidligere mottatt en bekreftelse på et tidspunkt for et dialogmøte med en av dine sykmeldte. Møteforespørselen er avbrutt, og du kan se bort fra denne forespørselen. Er det fortsatt aktuelt med et møte, vil du få en ny forespørsel.',
    avbrutt:
      'Du har tidligere mottatt en møteforespørsel med tidspunkter for et dialogmøte med en av dine sykmeldte. Møteforespørselsen er avbrutt, og du kan se bort fra denne forespørselen. Er det fortsatt aktuelt med et møte, vil du få en ny forespørsel.',
  },
};
/* eslint-enable max-len */

export const textExplanation = (mote) => {
  return mote.bekreftetTidspunkt ? texts.forklarende.bekreftet : texts.forklarende.avbrutt;
};

const AvbruttMote = ({ mote }) => {
  return (
    <div>
      <header className="sidetopp">
        <h1 className="sidetopp__tittel">{texts.title}</h1>
      </header>
      <div className="panel">
        <div className="illustrertTittel">
          <img className="illustrertTittel__img" src={moteAvbruttImage} alt={texts.subTitle} />
          <h2 className="illustrertTittel__tittel">{texts.subTitle}</h2>
        </div>
        <div>
          <p>{textExplanation(mote)}</p>
        </div>
        <div className="adskilt__blokk blokk">
          <h3 className="typo-element">{texts.blokkIngress}</h3>
          <div className="kvittering__svar blokk">
            {mote.alternativer.map((alternativ) => {
              return (
                <label key={alternativ.id} className="avbrutt__mote__svar">
                  {`${visDato(alternativ.tid)} ${texts.tid} ${visKlokkeslett(alternativ.tid)}`}
                </label>
              );
            })}
          </div>
          <h3 className="typo-element">{texts.sted}</h3>
          <p>{mote.alternativer[0].sted}</p>
        </div>
        <p>{texts.sporsmal}</p>
      </div>
    </div>
  );
};

AvbruttMote.propTypes = {
  mote: motePt,
};

export default AvbruttMote;
