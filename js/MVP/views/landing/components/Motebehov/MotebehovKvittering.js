import { getFullDateFormat } from '@/MVP/utils/dateUtils';
import { Element } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import {
  getHarBehovKvittering,
  KvitteringForklaring,
} from '../../../../../components/dialogmoter/motebehov/MotebehovKvitteringUtvidbar';
import { getBehovSvarText } from '../../../../../components/dialogmoter/motebehov/svarbehov/SvarMotebehovKvittering';
import { skjemaTypes } from '../../../../globals/constants';

const texts = {
  heading: 'Svaret ditt om behov for møte',
  content: 'Jeg har behov for et møte med NAV.',
};

const Content = (data) => {
  const { motebehov, skjemaType } = data;
  const { opprettetDato } = motebehov;
  const { forklaring } = motebehov.motebehovSvar;

  const dateElement = () => {
    return opprettetDato ? (
      <section>
        <Element>{getFullDateFormat(opprettetDato)}</Element>
        <br />
      </section>
    ) : null;
  };

  if (skjemaType === skjemaTypes.MELD_BEHOV) {
    return (
      <React.Fragment>
        {dateElement()}
        <p>{texts.content}</p>
        {KvitteringForklaring(forklaring)}
      </React.Fragment>
    );
  }

  const behovSvarText = getBehovSvarText(motebehov);

  return (
    <React.Fragment>
      {dateElement()}
      {getHarBehovKvittering(behovSvarText, true)}
      {KvitteringForklaring(forklaring)}
    </React.Fragment>
  );
};

const MotebehovKvittering = ({ motebehov }) => {
  const content = Content(motebehov);

  return (
    <React.Fragment>
      <h2>{texts.heading}</h2>

      {content}
    </React.Fragment>
  );
};
MotebehovKvittering.propTypes = { motebehov: PropTypes.object };

export default MotebehovKvittering;
