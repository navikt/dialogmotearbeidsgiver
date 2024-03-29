import * as PropTypes from 'prop-types';
import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppSpinner from '../../../components/AppSpinner';
import { AVBRUTT, BEKREFTET, getSvarsideModus, konverterTid, MOTESTATUS } from '@/utils/moteplanleggerUtils';
import { erMotePassert } from '@/utils/moteUtils';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { brevTypes } from '../../globals/constants';
import { useBrev } from '../../queries/brev';
import { useMotebehov } from '../../queries/motebehov';
import { useMoteplanlegger } from '../../queries/moteplanlegger';
import DialogmoteVideoPanel from './components/DialogmoteVideoPanel';
import MotebehovPanel from './components/MotebehovPanel';
import MoteinnkallelsePanel from './components/MoteinnkallelsePanel';
import MotereferatPanel from './components/MotereferatPanel';
import PreviousMotereferatPanel from './components/PreviousMotereferatPanel';
import VeilederSpeechBubble from '@/MVP/components/VeilederSpeechBubble';
import VeilederLandingContent from './components/VeilederLandingContent';
import MoteplanleggerKvitteringPanel from './MoteplanleggerKvitteringPanel';
import MoteplanleggerPanel from './MoteplanleggerPanel';
import FeilAlertStripe from '../../components/FeilAlertStripe';
import { useSykmeldte } from '../../queries/sykmeldte';
import { dialogmoteBreadcrumb } from '@/MVP/globals/paths';
import { Moteplanlegger } from '@/api/types/moteplanleggerTypes';
import { getLongDateFormat } from '@/MVP/utils/dateUtils';
import { isLocalOrLabs } from '@/utils/urlUtils';

interface PreviousMotereferatFeaturePanelProps {
  displayAlleReferater: boolean;
}

const Landing = (): ReactElement => {
  const { narmestelederId } = useParams<{ narmestelederId: string }>();

  const sykmeldt = useSykmeldte(narmestelederId);
  const moteplanlegger = useMoteplanlegger();
  const motebehov = useMotebehov(sykmeldt);
  const brev = useBrev(sykmeldt.data?.fnr);

  useEffect(() => {
    const hasNoUpcomingMoteplanleggerAlternativ = (): boolean => {
      if (!isLocalOrLabs() && moteplanlegger.isSuccess) {
        const today = new Date();

        const hasMoter = moteplanlegger.data.alternativer?.some((alternativ) => new Date(alternativ.tid) > today);

        return !hasMoter;
      }
      return false;
    };

    if (hasNoUpcomingMoteplanleggerAlternativ()) {
      window.location.href = window.location.href.replace(
        '/syk/dialogmotearbeidsgiver',
        '/syk/dialogmoter/arbeidsgiver'
      );
    }
  }, [moteplanlegger.data?.alternativer, moteplanlegger.isSuccess]);

  if (brev.isLoading || sykmeldt.isLoading || motebehov.isLoading || moteplanlegger.isLoading) {
    return <AppSpinner />;
  }

  const FetchFailedError = (): ReactElement | null => {
    if (moteplanlegger.isError || sykmeldt.isError || motebehov.isError || brev.isError) {
      return <FeilAlertStripe />;
    }

    return null;
  };

  const finnAktuellMote = (planlegger, fnr): Moteplanlegger | null => {
    if (planlegger.isSuccess && fnr) {
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
    }
    return null;
  };

  const sykmeldtFnr = sykmeldt.data?.fnr;

  const aktuellMote = finnAktuellMote(moteplanlegger, sykmeldtFnr);

  const harSammeAvlysningsstatus = (brevType, moteplanleggerStatus): boolean => {
    return (
      (brevType === brevTypes.AVLYST && moteplanleggerStatus === AVBRUTT) ||
      (brevType !== brevTypes.AVLYST && moteplanleggerStatus !== AVBRUTT)
    );
  };

  const displayBrev = (): boolean => {
    if (brev.isIdle || brev.isError || !brev.data || brev.data.length === 0) {
      return false;
    }

    if (moteplanlegger.isSuccess && aktuellMote !== null) {
      const brevArraySorted = brev.data.sort(
        (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      );
      const sistOpprettetBrev = brevArraySorted[0];
      const sistOpprettetBrevTidspunkt = new Date(sistOpprettetBrev.createdAt);
      const sistOpprettetMoteplanleggerMoteTidspunkt = new Date(aktuellMote.opprettetTidspunkt);

      if (
        harSammeAvlysningsstatus(sistOpprettetBrev.brevType, aktuellMote.status) ||
        sistOpprettetBrev.brevType === brevTypes.REFERAT
      ) {
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

  const displayMotebehov = (): boolean => {
    if (motebehov.isIdle || motebehov.isError || !motebehov.data.visMotebehov) return false;
    if (
      !moteplanlegger.isError &&
      aktuellMote !== null &&
      aktuellMote.status !== AVBRUTT &&
      !erMotePassert(aktuellMote)
    ) {
      return false;
    }

    if (!brev.isIdle && !brev.isError && brev.data[0]) {
      const brevHead = brev.data[0];
      if (brevHead.brevType === brevTypes.INNKALT || brevHead.brevType === brevTypes.ENDRING) return false;
    }

    return true;
  };

  const BrevPanel = (): ReactElement => {
    const brevHead = brev.data ? brev.data[0] : undefined;

    if (brevHead?.brevType === brevTypes.REFERAT) {
      const date = getLongDateFormat(brevHead.tid);
      return <MotereferatPanel date={date} narmestelederId={narmestelederId} />;
    }
    return <MoteinnkallelsePanel innkallelse={brevHead} narmestelederId={narmestelederId} />;
  };

  const PlanleggerPanel = (): ReactElement | null => {
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

  const DialogmoteFeaturePanel = (): ReactElement | null => {
    if (displayBrev()) {
      return BrevPanel();
    }
    if (!moteplanlegger.isError && aktuellMote !== null && !erMotePassert(aktuellMote)) {
      return PlanleggerPanel();
    }
    return null;
  };

  const PreviousMotereferatFeaturePanel = ({
    displayAlleReferater,
  }: PreviousMotereferatFeaturePanelProps): ReactElement | null => {
    if (brev.isIdle || brev.isError || (!displayAlleReferater && brev.data.length < 2)) return null;

    const currentBrev = displayBrev() && !displayAlleReferater ? brev.data.slice(1) : brev.data;
    const previousReferater = currentBrev.filter((hendelse) => hendelse.brevType === brevTypes.REFERAT);
    const previousReferatDates = previousReferater.map(({ tid }) => tid);

    return <PreviousMotereferatPanel previousReferatDates={previousReferatDates} narmestelederId={narmestelederId} />;
  };

  const MainContentPanel = (): ReactElement => {
    return (
      <React.Fragment>
        {displayMotebehov() && motebehov.data && (
          <MotebehovPanel motebehovStatus={motebehov.data} narmestelederId={narmestelederId} />
        )}

        <DialogmoteFeaturePanel />
        <PreviousMotereferatFeaturePanel displayAlleReferater={false} />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {sykmeldt.data && (
        <DialogmoteContainer title="Dialogmøter" breadcrumb={dialogmoteBreadcrumb(sykmeldt.data)}>
          <VeilederSpeechBubble content={<VeilederLandingContent />} />

          <FetchFailedError />

          <MainContentPanel />

          <DialogmoteVideoPanel />
        </DialogmoteContainer>
      )}
    </React.Fragment>
  );
};

Landing.propTypes = {
  params: PropTypes.shape({
    narmestelederId: PropTypes.string,
  }),
};

export default Landing;
