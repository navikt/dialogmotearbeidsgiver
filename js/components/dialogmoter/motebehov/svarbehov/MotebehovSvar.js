import React from 'react';
import PropTypes from 'prop-types';
import { sykmeldt as sykmeldtPt, motebehovSvarReducerPt } from '../../../../propTypes';
import SvarMotebehovSkjema from './SvarMotebehovSkjema';
import MotebehovInfoForSvar from './MotebehovInfoForSvar';
import FolketrygdlovenTekst from './FolketrygdlovenTekst';

const MotebehovSvar = ({ sykmeldt, motebehovSvarReducer, svarMotebehov }) => {
  return (
    <div className="motebehovSvar">
      <FolketrygdlovenTekst />

      <MotebehovInfoForSvar narmestelederId={sykmeldt.narmestelederId} />

      <SvarMotebehovSkjema
        sykmeldt={sykmeldt}
        motebehovSvarReducer={motebehovSvarReducer}
        svarMotebehov={svarMotebehov}
      />
    </div>
  );
};
MotebehovSvar.propTypes = {
  sykmeldt: sykmeldtPt,
  motebehovSvarReducer: motebehovSvarReducerPt,
  svarMotebehov: PropTypes.func,
};

export default MotebehovSvar;
