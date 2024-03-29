import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motebehovReducerPt } from '@/propTypes';
import { harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle, isMeldBehov, isSvarBehov } from '@/utils/motebehovUtils';
import { Link } from 'react-router-dom';

const TEKSTER = {
  tittel: 'Trenger dere et dialogmøte med NAV?',
  undertekst: 'Er det ikke behov for møte? Da trenger du ikke svare på denne.',
  knappKvittering: 'Se Kvittering',
  meldBehov: {
    knappBehov: 'Meld behov for møte',
  },
  svarBehov: {
    knappBehov: 'Vurder behov for møte',
  },
};

const MotebehovInnholdLenkeStyled = styled.div`
  text-align: center;
`;

const getTextLink = (motebehov): string => {
  if (harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov)) {
    return TEKSTER.knappKvittering;
  } else if (isSvarBehov(motebehov)) {
    return TEKSTER.svarBehov.knappBehov;
  }
  return TEKSTER.meldBehov.knappBehov;
};

const MotebehovInnholdLenke = ({ narmestelederId, motebehov }): ReactElement => {
  const linkText = getTextLink(motebehov);

  return (
    <MotebehovInnholdLenkeStyled className="motebehovInnholdLenke panel">
      <h2 className="panel__tittel">{TEKSTER.tittel}</h2>
      {isMeldBehov(motebehov) && <p>{TEKSTER.undertekst}</p>}
      <Link className="knapp" to={`${process.env.REACT_APP_CONTEXT_ROOT}/${narmestelederId}/behov`}>
        {linkText}
      </Link>
    </MotebehovInnholdLenkeStyled>
  );
};
MotebehovInnholdLenke.propTypes = {
  narmestelederId: PropTypes.string,
  motebehov: motebehovReducerPt,
};

export default MotebehovInnholdLenke;
