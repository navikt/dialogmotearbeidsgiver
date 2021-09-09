import React from 'react';
import VeilederLanding from './components/VeilederLanding';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import DialogmoteVideoPanel from './components/DialogmoteVideoPanel';

const Landing = () => {
  const DialogmoteFeaturePanel = () => {
    //  TODO
    return null;
  };
  return (
    <DialogmoteContainer title="Dialogmøter">
      <VeilederLanding />

      { /*{motebehov.data.visMotebehov && <MotebehovPanel motebehov={motebehov} />}*/ }

      <DialogmoteFeaturePanel />

      { /*<PreviousMotereferatPanel previousReferatDates={previousReferatDates} />*/ }

      <DialogmoteVideoPanel />
    </DialogmoteContainer>
  );
};

Landing.propTypes = {};

export default Landing;
