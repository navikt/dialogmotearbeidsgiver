import React from 'react';
import { moteplanleggerDeltakerPt, motePt } from '@/propTypes';
import { ARBEIDSGIVER } from '@/enums/moteplanleggerDeltakerTyper';
import { finnDeltakerByType } from '@/utils/moteplanleggerUtils';
import BesvarteTidspunkter from './BesvarteTidspunkter';
import Motested from './Motested';
import motesvarSendtImage from '../../../../img/svg/motesvarSendt.svg';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

const texts = {
  title: 'Svaret ditt på tidspunkt for dialogmøte',
  titleUtvidbar: 'Se dine svar',
  moteSvarSendtImageAltText: 'Sendt møtesvar',
};

const TextConfirmation = () => {
  return (
    <React.Fragment>
      Svaret ditt er sendt
      <br />– du hører fra oss
    </React.Fragment>
  );
};

/* eslint-disable max-len */
export const VeienVidereTekst = ({ deltaker }) => {
  const harDeltakerIkkeValgtSvar =
    deltaker.svar.filter((svar) => {
      return svar.valgt;
    }).length === 0;
  if (harDeltakerIkkeValgtSvar) {
    return (
      <p>
        Du vil få nye tidspunkter å velge mellom dersom det fortsatt er aktuelt med et møte. Har du behov for kontakt
        med NAV, kan du ringe oss på 55 55 33 36.
      </p>
    );
  }
  return (
    <p>
      Når det endelige tidspunktet er avklart, vil du få en innkalling i posten med mer informasjon om møtet. Har du
      behov for kontakt med NAV, kan du ringe oss på tlf: 55 55 33 36
    </p>
  );
};
/* eslint-enable max-len */
VeienVidereTekst.propTypes = {
  deltaker: moteplanleggerDeltakerPt,
};

const Kvittering = ({ mote }) => {
  const deltaker = finnDeltakerByType(mote.deltakere, ARBEIDSGIVER);
  return (
    <div>
      <header className="sidetopp">
        <h1 className="sidetopp__tittel">{texts.title}</h1>
      </header>
      <div className="panel">
        <div className="illustrertTittel">
          <img className="illustrertTittel__img" src={motesvarSendtImage} alt={texts.moteSvarSendtImageAltText} />
          <h2 className="illustrertTittel__tittel">
            <div>
              <TextConfirmation />
            </div>
          </h2>
        </div>
        <div className="redaksjonelt blokk">
          <VeienVidereTekst deltaker={deltaker} />
        </div>
        <Ekspanderbartpanel tittel={texts.titleUtvidbar}>
          <div>
            <div className="blokk">
              <Motested sted={deltaker.svar[0].sted} />
            </div>
            <BesvarteTidspunkter mote={mote} alternativer={mote.alternativer} />
          </div>
        </Ekspanderbartpanel>
      </div>
    </div>
  );
};

Kvittering.propTypes = {
  mote: motePt,
};

export default Kvittering;
