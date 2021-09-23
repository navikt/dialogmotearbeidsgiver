import React from 'react';
import PropTypes from 'prop-types';
import { moteplanleggerDeltakerPt, moteplanleggerSvarPt } from '../../../propTypes';
import { getSvar, MULIGE_SVAR } from '../../../utils/moteplanleggerUtils';
import { ARBEIDSGIVER } from '../../../enums/moteplanleggerDeltakerTyper';
import kanMoteImage from '../../../../img/svg/status--kan.svg';
import kanIkkeMoteImage from '../../../../img/svg/status--kanikke.svg';
import ikkeSvartImage from '../../../../img/svg/status--ikkesvar.svg';

const { PASSER, PASSER_IKKE } = MULIGE_SVAR;

const texts = {
  veilederKanMote: 'Veilederen kan møte på dette tidspunktet',
  svarAlternativImageAltText: 'Kan bruker møte til dialogmøte?',
};

const Ikon = ({ ikon }) => {
  return (
    <div className="alternativsvar__ikon">
      <img src={ikon} className="js-ikon-passer" alt={texts.svarAlternativImageAltText} />
    </div>
  );
};

Ikon.propTypes = {
  ikon: PropTypes.string.isRequired,
};

const getSvartekst = (bruker, svar) => {
  const svarstr = getSvar(svar, bruker.svartidspunkt);
  switch (svarstr) {
    case PASSER: {
      return `${bruker.navn} kan møte på dette tidspunktet`;
    }
    case PASSER_IKKE: {
      return `${bruker.navn} kan ikke møte på dette tidspunktet`;
    }
    default: {
      return `${bruker.navn} har ikke svart ennå`;
    }
  }
};

const getIkonPath = (bruker, svar) => {
  const svarstr = getSvar(svar, bruker.svartidspunkt);
  switch (svarstr) {
    case PASSER: {
      return kanMoteImage;
    }
    case PASSER_IKKE: {
      return kanIkkeMoteImage;
    }
    default: {
      return ikkeSvartImage;
    }
  }
};

const Svartekst = ({ tekst, deltakertype }) => {
  return (
    <div className="alternativsvar__tekst">
      <p>
        <span className="alternativsvar__deltakertype">{deltakertype}:</span> {tekst}
      </p>
    </div>
  );
};

Svartekst.propTypes = {
  tekst: PropTypes.string.isRequired,
  deltakertype: PropTypes.string.isRequired,
};

export const NavKan = () => {
  return (
    <li className="alternativsvar__svar js-navssvar">
      <Ikon ikon={kanMoteImage} />
      <Svartekst deltakertype="NAV" tekst={texts.veilederKanMote} />
    </li>
  );
};

export const SvarMedIkon = ({ bruker, svar }) => {
  const deltakertype = bruker.type === ARBEIDSGIVER ? 'Arbeidsgiver' : 'Arbeidstaker';
  return (
    <li className="alternativsvar__svar js-annenssvar">
      <Ikon ikon={getIkonPath(bruker, svar)} />
      <Svartekst deltakertype={`${deltakertype}en`} navn={bruker.navn} tekst={getSvartekst(bruker, svar)} />
    </li>
  );
};

SvarMedIkon.propTypes = {
  bruker: moteplanleggerDeltakerPt,
  svar: moteplanleggerSvarPt,
};
