import React from 'react';
import VeilederLanding from './components/VeilederLanding';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import DialogmoteVideoPanel from './components/DialogmoteVideoPanel';

const Landing = () => {
  // const brev = useBrev();
  // const motebehov = useMotebehov();
  // const moteplanlegger = useMoteplanlegger();

  const displayMotebehov = () => {
    // if (motebehov.isError || !motebehov.data.visMotebehov) return false;
    // if (!moteplanlegger.isError && !displayBrev() && !erMotePassert(moteplanlegger.data)) return false;
    // if (!brev.isError && brev.data[0]) {
    //   const brevHead = brev.data[0];
    //   if (brevHead.brevType === brevTypes.INNKALLELSE || brevHead.brevType === brevTypes.ENDRING) return false;
    // }

    return true;
  };

  const DialogmoteFeaturePanel = () => {
    //  TODO
    return null;
  };

  return (
    <DialogmoteContainer title="Dialogmøter">
      <VeilederLanding />

      {/*<FetchFailedError />*/}

      {displayMotebehov() && <MotebehovPanel motebehov={motebehov} />}

      <DialogmoteFeaturePanel />

      {/*<PreviousMotereferatPanel previousReferatDates={previousReferatDates} />*/}

      <DialogmoteVideoPanel />
    </DialogmoteContainer>
  );
};

Landing.propTypes = {};

export default Landing;
