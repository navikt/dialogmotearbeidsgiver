import * as PropTypes from 'prop-types';
import React from 'react';
import AppSpinner from '../../../components/AppSpinner';
import { BEKREFTET, getSvarsideModus, konverterTid, MOTESTATUS } from '../../../utils/moteplanleggerUtils';
import { erMotePassert } from '../../../utils/moteUtils';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { useMotebehov } from '../../hooks/motebehov';
import { useMoteplanlegger } from '../../hooks/moteplanlegger';
import { useBerikSykmeldte, useSykmeldte } from '../../hooks/sykmeldte';
import DialogmoteVideoPanel from './components/DialogmoteVideoPanel';
import MotebehovPanel from './components/MotebehovPanel';
import VeilederLanding from './components/VeilederLanding';
import MoteplanleggerKvitteringPanel from './MoteplanleggerKvitteringPanel';
import MoteplanleggerPanel from './MoteplanleggerPanel';

export const Landing = (props) => {
  const forespurtKoblingId = props.params.koblingId;

  const sykmeldte = useSykmeldte();
  const beriketeSykmeldte = useBerikSykmeldte(sykmeldte.isSuccess, sykmeldte);
  const moteplanlegger = useMoteplanlegger();

  const forespurtAnsatt = sykmeldte.isSuccess
    ? sykmeldte.data.filter((s) => s.koblingId == forespurtKoblingId)[0]
    : null;

  const forespurtBeriketAnsatt = beriketeSykmeldte.isSuccess
    ? beriketeSykmeldte.data.filter((s) => s.koblingId == forespurtKoblingId)[0]
    : null;

  const ansatt = {
    ...forespurtAnsatt,
    ...forespurtBeriketAnsatt,
    koblingId: forespurtKoblingId,
  };

  const motebehov = useMotebehov(beriketeSykmeldte.isSuccess, ansatt);

  if (sykmeldte.isLoading || beriketeSykmeldte.isLoading || motebehov.isLoading) {
    return <AppSpinner />;
  }

  const getMote = (moteplanlegger, fnr) => {
    const moter =
      moteplanlegger.data &&
      moteplanlegger.data
        .filter((s) => {
          return `${s.fnr}` === fnr;
        })
        .sort((m1, m2) => {
          return new Date(m1.opprettetTidspunkt).getTime() <= new Date(m2.opprettetTidspunkt).getTime() ? 1 : -1;
        });
    return moter && moter.length > 0 ? moter[0] : null;
  };

  const aktuellMote = moteplanlegger.isSuccess ? getMote(moteplanlegger, ansatt.fnr) : null;

  const displayMotebehov = () => {
    if (motebehov.isError || !motebehov.data.visMotebehov) return false;
    // TODO: utvid logikk
    return true;
  };

  const PlanleggerPanel = () => {
    const modus = getSvarsideModus(aktuellMote);
    const convertedMotedata = konverterTid(aktuellMote);
    if (modus === BEKREFTET || modus === MOTESTATUS) {
      return <MoteplanleggerKvitteringPanel mote={convertedMotedata} modus={modus} sykmeldt={ansatt} />;
    }
    return <MoteplanleggerPanel koblingId={forespurtKoblingId} mote={convertedMotedata} />;
  };

  const DialogmoteFeaturePanel = () => {
    if (!moteplanlegger.isError && !erMotePassert(aktuellMote)) {
      return PlanleggerPanel();
    }
    return null;
  };

  return (
    <DialogmoteContainer title="Dialogmøter" sykmeldt={ansatt}>
      <VeilederLanding />

      {/* <FetchFailedError /> */}

      {displayMotebehov() && <MotebehovPanel motebehov={motebehov} koblingId={forespurtKoblingId} />}

      <DialogmoteFeaturePanel />

      {/* <PreviousMotereferatPanel previousReferatDates={previousReferatDates} /> */}

      <DialogmoteVideoPanel />
    </DialogmoteContainer>
  );
};

Landing.propTypes = {
  params: PropTypes.shape({
    koblingId: PropTypes.string,
  }),
};

export default Landing;
