import React from 'react';
import PropTypes from 'prop-types';
import { motebehovReducerPt, sykmeldt as sykmeldtPt } from '../../propTypes';
import { harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle, MOTEBEHOV_SKJEMATYPE } from '@/utils/motebehovUtils';
import Sidetopp from '../Sidetopp';
import DialogmoteVideo from './DialogmoteVideo';
import DialogmoterInnholdLenke from './DialogmoterInnholdLenke';
import MotebehovInnholdLenke from './MotebehovInnholdLenke';
import DialogmoterInnholdVeileder from './DialogmoterInnholdVeileder';
import SvarMotebehovKvittering from './motebehov/svarbehov/SvarMotebehovKvittering';
import MeldMotebehovKvittering from './motebehov/meldbehov/MeldMotebehovKvittering';

const texts = {
  title: 'Dialogmøter',
};

const MotebehovInnholdKvittering = ({ sykmeldt, motebehov }) => {
  const isKvittering = harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov);
  const skjemaType = motebehov.data.skjemaType;
  let content = React.Fragment;
  if (isKvittering) {
    if (skjemaType === MOTEBEHOV_SKJEMATYPE.MELD_BEHOV) {
      content = <MeldMotebehovKvittering narmestelederId={sykmeldt.narmestelederId} motebehov={motebehov} />;
    } else if (skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV) {
      content = <SvarMotebehovKvittering motebehov={motebehov} />;
    }
  } else {
    content = (
      <React.Fragment>
        <DialogmoterInnholdVeileder arbeidstakerName={sykmeldt.navn} />
        <MotebehovInnholdLenke narmestelederId={sykmeldt.narmestelederId} motebehov={motebehov} />
      </React.Fragment>
    );
  }
  return content;
};
MotebehovInnholdKvittering.propTypes = {
  sykmeldt: sykmeldtPt,
  motebehov: motebehovReducerPt,
};

const DialogmoterInnhold = ({ sykmeldt, narmestelederId, motebehov, harMote, skalViseMotebehov }) => {
  return (
    <div className="dialogmoterInnhold">
      <Sidetopp tittel={texts.title} />

      {skalViseMotebehov && <MotebehovInnholdKvittering sykmeldt={sykmeldt} motebehov={motebehov} />}

      {harMote && <DialogmoterInnholdLenke narmestelederId={narmestelederId} />}
      <DialogmoteVideo />
    </div>
  );
};
DialogmoterInnhold.propTypes = {
  sykmeldt: sykmeldtPt,
  narmestelederId: PropTypes.string,
  motebehov: motebehovReducerPt,
  harMote: PropTypes.bool,
  skalViseMotebehov: PropTypes.bool,
};

export default DialogmoterInnhold;
