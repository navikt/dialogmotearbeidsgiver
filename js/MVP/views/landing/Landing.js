import * as PropTypes from 'prop-types';
import React from 'react';
import AppSpinner from '../../../components/AppSpinner';
import { AVBRUTT, BEKREFTET, getSvarsideModus, konverterTid, MOTESTATUS } from '../../../utils/moteplanleggerUtils';
import { erMotePassert } from '../../../utils/moteUtils';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { brevTypes } from '../../globals/constants';
import { useBrev } from '../../queries/brev';
import { useMotebehov } from '../../queries/motebehov';
import { useMoteplanlegger } from '../../queries/moteplanlegger';
import { getLongDateFormat } from '../../utils';
import DialogmoteVideoPanel from './components/DialogmoteVideoPanel';
import MotebehovPanel from './components/MotebehovPanel';
import MoteinnkallelsePanel from './components/MoteinnkallelsePanel';
import MotereferatPanel from './components/MotereferatPanel';
import PreviousMotereferatPanel from './components/PreviousMotereferatPanel';
import VeilederLanding from './components/VeilederLanding';
import MoteplanleggerKvitteringPanel from './MoteplanleggerKvitteringPanel';
import MoteplanleggerPanel from './MoteplanleggerPanel';
import FeilAlertStripe from '../../components/FeilAlertStripe';
import { useSykmeldte } from '../../queries/sykmeldte';

const Landing = (props) => {
  const narmestelederId = props.params.narmestelederId;

  const sykmeldt = useSykmeldte(narmestelederId);
  const moteplanlegger = useMoteplanlegger();
  const motebehov = useMotebehov(sykmeldt);
  const brev = useBrev(narmestelederId);

  if (brev.isLoading || sykmeldt.isLoading || motebehov.isLoading || moteplanlegger.isLoading) {
    return <AppSpinner />;
  }

  const FetchFailedError = () => {
    if (moteplanlegger.isError || sykmeldt.isError || motebehov.isError || brev.isError) {
      return <FeilAlertStripe />;
    }

    return null;
  };

  const finnAktuellMote = (planlegger, fnr) => {
    const moter =
      planlegger.data &&
      planlegger.data
        .filter((s) => {
          return `${s.fnr}` === fnr;
        })
        .sort((m1, m2) => {
          return new Date(m1.opprettetTidspunkt).getTime() <= new Date(m2.opprettetTidspunkt).getTime() ? 1 : -1;
        });
    return moter && moter.length > 0 ? moter[0] : null;
  };

  const aktuellMote = finnAktuellMote(moteplanlegger, sykmeldt.data.fnr);

  const harSammeAvlysningsstatus = (brevType, moteplanleggerStatus) => {
    return (
      (brevType === brevTypes.AVLYST && moteplanleggerStatus === AVBRUTT) ||
      (brevType !== brevTypes.AVLYST && moteplanleggerStatus !== AVBRUTT)
    );
  };

  const displayBrev = () => {
    if (brev.isIdle || brev.isError || !brev.data || brev.data.length === 0) {
      return false;
    }

    if (moteplanlegger.isSuccess && aktuellMote !== null) {
      const brevArraySorted = brev.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const sistOpprettetBrev = brevArraySorted[0];
      const sistOpprettetBrevTidspunkt = new Date(sistOpprettetBrev.createdAt);
      const sistOpprettetMoteplanleggerMoteTidspunkt = new Date(aktuellMote.opprettetTidspunkt);

      if (harSammeAvlysningsstatus(sistOpprettetBrev.brevType, aktuellMote.status)) {
        return sistOpprettetBrevTidspunkt > sistOpprettetMoteplanleggerMoteTidspunkt;
      }
      if (
        sistOpprettetBrev.brevType === brevTypes.AVLYST &&
        aktuellMote.status !== AVBRUTT &&
        !erMotePassert(aktuellMote)
      ) {
        return false;
      }
    }
    return true;
  };

  const displayMotebehov = () => {
    if (motebehov.isIdle || motebehov.isError || !motebehov.data.visMotebehov) return false;
    if (
      !moteplanlegger.isError &&
      aktuellMote !== null &&
      aktuellMote.status !== AVBRUTT &&
      erMotePassert(aktuellMote)
    ) {
      return false;
    }

    if (!brev.isIdle && !brev.isError && brev.data[0]) {
      const brevHead = brev.data[0];
      if (brevHead.brevType === brevTypes.INNKALT || brevHead.brevType === brevTypes.ENDRING) return false;
    }

    return true;
  };

  const BrevPanel = () => {
    const brevHead = brev.data[0];

    if (brevHead.brevType === brevTypes.REFERAT) {
      const date = getLongDateFormat(brevHead.tid);
      return <MotereferatPanel date={date} narmestelederId={narmestelederId} />;
    }
    return <MoteinnkallelsePanel innkallelse={brevHead} narmestelederId={narmestelederId} />;
  };

  const PlanleggerPanel = () => {
    if (aktuellMote !== null) {
      const modus = getSvarsideModus(aktuellMote);
      const convertedMotedata = konverterTid(aktuellMote);
      if (modus === BEKREFTET || modus === MOTESTATUS) {
        return <MoteplanleggerKvitteringPanel mote={convertedMotedata} modus={modus} sykmeldt={sykmeldt.data} />;
      }
      return <MoteplanleggerPanel narmestelederId={narmestelederId} modus={modus} />;
    }
    return null;
  };

  const DialogmoteFeaturePanel = () => {
    if (displayBrev()) {
      return BrevPanel();
    }
    if (!moteplanlegger.isError && aktuellMote !== null && !erMotePassert(aktuellMote)) {
      return PlanleggerPanel();
    }
    return null;
  };

  const PreviousMotereferatFeaturePanel = () => {
    if (brev.isIdle || brev.isError || brev.data.length < 2) return null;

    const currentBrev = displayBrev() ? brev.data.slice(1) : brev.data;
    const previousReferater = currentBrev.filter((hendelse) => hendelse.brevType === brevTypes.REFERAT);
    const previousReferatDates = previousReferater.map(({ tid }) => tid);

    return <PreviousMotereferatPanel previousReferatDates={previousReferatDates} narmestelederId={narmestelederId} />;
  };

  return (
    <DialogmoteContainer title="Dialogmøter" sykmeldt={sykmeldt.data}>
      <VeilederLanding />

      <FetchFailedError />

      {displayMotebehov() && <MotebehovPanel motebehov={motebehov} narmestelederId={narmestelederId} />}

      <DialogmoteFeaturePanel />
      <PreviousMotereferatFeaturePanel />
      <DialogmoteVideoPanel />
    </DialogmoteContainer>
  );
};

Landing.propTypes = {
  params: PropTypes.shape({
    narmestelederId: PropTypes.string,
  }),
};

export default Landing;
