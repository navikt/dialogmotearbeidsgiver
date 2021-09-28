import AlertStripe from 'nav-frontend-alertstriper';
import * as PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import AppSpinner from '../../../components/AppSpinner';
import { AVBRUTT, BEKREFTET, getSvarsideModus, konverterTid, MOTESTATUS } from '../../../utils/moteplanleggerUtils';
import { erMotePassert } from '../../../utils/moteUtils';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { useMotebehov } from '../../hooks/motebehov';
import { useMoteplanlegger } from '../../hooks/moteplanlegger';
import { useSykmeldt } from '../../hooks/sykmeldt';
import DialogmoteVideoPanel from './components/DialogmoteVideoPanel';
import MotebehovPanel from './components/MotebehovPanel';
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

  if (sykmeldt.isLoading || motebehov.isLoading || moteplanlegger.isLoading) {
    return <AppSpinner />;
  }

  const FetchFailedError = () => {
    if (sykmeldt.isError || motebehov.isError || moteplanlegger.isError) {
      return (
        <AlertStripeStyled type="feil">
          Akkurat nå mangler det noe her. Vi har tekniske problemer som vi jobber med å løse. Prøv gjerne igjen om en
          stund.
        </AlertStripeStyled>
      );
    }

    return null;
  };

  const finnAktuellMote = (moteplanlegger, fnr) => {
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

  const aktuellMote = moteplanlegger.isSuccess ? finnAktuellMote(moteplanlegger, sykmeldt.fnr) : null;

  const displayMotebehov = () => {
    if (motebehov.isError || !motebehov.data || !motebehov.data.visMotebehov) {
      return false;
    }
    if (!moteplanlegger.isError && moteplanlegger.data.status !== AVBRUTT && !erMotePassert(aktuellMote)) {
      return false;
    }
    // TODO: brev
    return true;
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
    // TODO: brev
    if (!moteplanlegger.isError && !erMotePassert(aktuellMote)) {
      return PlanleggerPanel();
    }
    return null;
  };

  return (
    <DialogmoteContainer title="Dialogmøter" sykmeldt={sykmeldt}>
      <VeilederLanding />

      <FetchFailedError />

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
