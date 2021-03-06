import React from 'react';
import PropTypes from 'prop-types';
import { sykmeldt as sykmeldtPt, motebehovReducerPt, motebehovSvarReducerPt } from '../../../propTypes';
import { MOTEBEHOV_SKJEMATYPE } from '../../../utils/motebehovUtils';
import MotebehovInnholdMeldBehov from './meldbehov/MeldMotebehovInnhold';
import MotebehovInnholdSvarBehov from './svarbehov/SvarMotebehovInnhold';

const MotebehovInnhold = ({ svarMotebehov, sykmeldt, motebehov, motebehovSvarReducer }) => {
  const skjemaType = motebehov.data.skjemaType;
  let content = React.Fragment;
  if (skjemaType === MOTEBEHOV_SKJEMATYPE.MELD_BEHOV) {
    content = (
      <MotebehovInnholdMeldBehov
        svarMotebehov={svarMotebehov}
        sykmeldt={sykmeldt}
        motebehov={motebehov}
        motebehovSvarReducer={motebehovSvarReducer}
      />
    );
  } else if (skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV) {
    content = (
      <MotebehovInnholdSvarBehov
        svarMotebehov={svarMotebehov}
        sykmeldt={sykmeldt}
        motebehov={motebehov}
        motebehovSvarReducer={motebehovSvarReducer}
      />
    );
  }
  return <div className="motebehovSideInnhold">{content}</div>;
};
MotebehovInnhold.propTypes = {
  svarMotebehov: PropTypes.func,
  sykmeldt: sykmeldtPt,
  motebehov: motebehovReducerPt,
  motebehovSvarReducer: motebehovSvarReducerPt,
};

export default MotebehovInnhold;
