import * as PropTypes from 'prop-types';
import React from 'react';
import AppSpinner from '../../../components/AppSpinner';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { useMotebehov } from '../../hooks/motebehov';
import { useBerikSykmeldte, useSykmeldte } from '../../hooks/sykmeldte';
import DialogmoteVideoPanel from './components/DialogmoteVideoPanel';
import MotebehovPanel from './components/MotebehovPanel';
import VeilederLanding from './components/VeilederLanding';

export const Landing = (props) => {
  const forespurtKoblingId = props.params.koblingId;
  const sykmeldte = useSykmeldte();
  const beriketeSykmeldte = useBerikSykmeldte(sykmeldte.isSuccess, sykmeldte);

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

  const displayMotebehov = () => {
    if (motebehov.isError || !motebehov.data.visMotebehov) return false;
    // TODO: utvid logikk
    return true;
  };

  const DialogmoteFeaturePanel = () => {
    //  TODO
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
