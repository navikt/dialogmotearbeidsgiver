import React from 'react';
import PropTypes from 'prop-types';
import { hentOppfolgingsplanarbeidsgiverUrl } from '../../../../utils/urlUtils';
import forDuSvarerImage from '../../../../../img/svg/forDuSvarer.svg';

/* eslint-disable max-len */
export const texts = {
  forDuSvarer: {
    tittel: 'Før du svarer',
    lagetPlan: 'Har dere laget en oppfølgingsplan? Husk å dele den med NAV nå.',
    ikkeLagetPlan: 'Er oppfølgingsplanen ikke laget?',
    imageAltText: 'Illustrasjon avmerkingsbokser',
  },
  tekstInformasjonInnhold: {
    lenke: 'Opprett en ny plan.',
  },
};
/* eslint-enable max-len */

export const TekstInformasjonBilde = () => {
  return (
    <div className="tekstInformasjon__bilde">
      <img src={forDuSvarerImage} alt={texts.forDuSvarer.imageAltText} />
    </div>
  );
};

export const TekstInformasjonInnhold = ({ narmestelederId }) => {
  return (
    <div className="tekstInformasjon__innhold">
      <h2 className="tekstInformasjon__tittel">{texts.forDuSvarer.tittel}</h2>
      <ul>
        <li>{texts.forDuSvarer.lagetPlan}</li>
        <li>
          {texts.forDuSvarer.ikkeLagetPlan}{' '}
          <a className="lenke" href={hentOppfolgingsplanarbeidsgiverUrl(narmestelederId)}>
            {texts.tekstInformasjonInnhold.lenke}
          </a>
        </li>
      </ul>
    </div>
  );
};
TekstInformasjonInnhold.propTypes = {
  narmestelederId: PropTypes.string,
};

const MotebehovInfoForSvar = ({ narmestelederId }) => {
  return (
    <div className="panel motebehovInfoForSvar">
      <TekstInformasjonBilde />
      <TekstInformasjonInnhold narmestelederId={narmestelederId} />
    </div>
  );
};
MotebehovInfoForSvar.propTypes = {
  narmestelederId: PropTypes.string,
};

export default MotebehovInfoForSvar;
