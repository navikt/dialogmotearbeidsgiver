import AlertStripe from 'nav-frontend-alertstriper';
import * as PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import AppSpinner from '../../../components/AppSpinner';
import { AVBRUTT, BEKREFTET, getSvarsideModus, konverterTid, MOTESTATUS } from '../../../utils/moteplanleggerUtils';
import { erMotePassert } from '../../../utils/moteUtils';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { brevTypes } from '../../globals/constants';
import { useBrev } from '../../hooks/brev';
import { useMotebehov } from '../../hooks/motebehov';
import { useMoteplanlegger } from '../../hooks/moteplanlegger';
import { useSykmeldt } from '../../hooks/sykmeldt';
import { getLongDateFormat } from '../../utils';
import DialogmoteVideoPanel from './components/DialogmoteVideoPanel';
import MotebehovPanel from './components/MotebehovPanel';
import MoteinnkallelsePanel from './components/MoteinnkallelsePanel';
import MotereferatPanel from './components/MotereferatPanel';
import PreviousMotereferatPanel from './components/PreviousMotereferatPanel';
import VeilederLanding from './components/VeilederLanding';
import MoteplanleggerKvitteringPanel from './MoteplanleggerKvitteringPanel';
import MoteplanleggerPanel from './MoteplanleggerPanel';

const AlertStripeStyled = styled(AlertStripe)`
  margin-bottom: 32px;
`;

const Landing = (props) => {
  const forespurtKoblingId = props.params.koblingId;

  const sykmeldt = useSykmeldt(forespurtKoblingId);
  const moteplanlegger = useMoteplanlegger();
  const motebehov = useMotebehov(sykmeldt);
  const brev = useBrev();

  if (brev.isLoading || sykmeldt.isLoading || motebehov.isLoading || moteplanlegger.isLoading) {
    return <AppSpinner />;
  }

  const FetchFailedError = () => {
    if (brev.isError || sykmeldt.isError || motebehov.isError || moteplanlegger.isError) {
      return (
        <AlertStripeStyled type="feil">
          Akkurat nå mangler det noe her. Vi har tekniske problemer som vi jobber med å løse. Prøv gjerne igjen om en
          stund.
        </AlertStripeStyled>
      );
    }

    return null;
  };

  const displayBrev = () => {
    if (brev.isError || brev.data.length === 0) {
      return false;
    }

    if (!moteplanlegger.isError && moteplanlegger.data) {
      if (moteplanlegger.data.status !== AVBRUTT) {
        const brevDatoArraySorted = brev.data.map((i) => new Date(i.createdAt)).sort((a, b) => b - a);
        const sistOpprettetBrev = brevDatoArraySorted[0];
        const sistOpprettetMoteplanleggerMoteTidspunkt = new Date(moteplanlegger.data.opprettetTidspunkt);

        return sistOpprettetBrev > sistOpprettetMoteplanleggerMoteTidspunkt;
      }
    }
    return true;
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

  const aktuellMote = moteplanlegger.isSuccess ? finnAktuellMote(moteplanlegger, sykmeldt.fnr) : null;

  const displayMotebehov = () => {
    if (motebehov.isError || !motebehov.data || !motebehov.data.visMotebehov) {
      return false;
    }
    if (!moteplanlegger.isError && moteplanlegger.data.status !== AVBRUTT && !erMotePassert(aktuellMote)) {
      return false;
    }
    if (!brev.isError && brev.data[0]) {
      const brevHead = brev.data[0];
      if (brevHead.brevType === brevTypes.INNKALT || brevHead.brevType === brevTypes.ENDRING) return false;
    }
    return true;
  };

  const BrevPanel = () => {
    const brevHead = brev.data[0];

    if (brevHead.brevType === brevTypes.REFERAT) {
      const date = getLongDateFormat(brevHead.tid);
      return <MotereferatPanel date={date} />;
    }
    return <MoteinnkallelsePanel innkallelse={brevHead} />;
  };

  const PlanleggerPanel = () => {
    const modus = getSvarsideModus(aktuellMote);
    const convertedMotedata = konverterTid(aktuellMote);
    if (modus === BEKREFTET || modus === MOTESTATUS) {
      return <MoteplanleggerKvitteringPanel mote={convertedMotedata} modus={modus} sykmeldt={sykmeldt} />;
    }
    return <MoteplanleggerPanel koblingId={forespurtKoblingId} modus={modus} />;
  };

  const DialogmoteFeaturePanel = () => {
    if (displayBrev()) {
      return BrevPanel();
    }
    if (!moteplanlegger.isError && !erMotePassert(aktuellMote)) {
      return PlanleggerPanel();
    }
    return null;
  };

  const PreviousMotereferatFeaturePanel = () => {
    if (brev.isError || brev.data.length < 2) return null;

    const currentBrev = displayBrev() ? brev.data.slice(1) : brev.data;
    const previousReferater = currentBrev.filter((hendelse) => hendelse.brevType === brevTypes.REFERAT);
    const previousReferatDates = previousReferater.map(({ tid }) => tid);

    return <PreviousMotereferatPanel previousReferatDates={previousReferatDates} />;
  };

  return (
    <DialogmoteContainer title="Dialogmøter" sykmeldt={sykmeldt}>
      <VeilederLanding />

      <FetchFailedError />

      {displayMotebehov() && <MotebehovPanel motebehov={motebehov} koblingId={forespurtKoblingId} />}

      <DialogmoteFeaturePanel />
      <PreviousMotereferatFeaturePanel />
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
