import React from 'react';
import { useParams } from 'react-router-dom';
import AppSpinner from '../../../components/AppSpinner';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { brevTypes } from '../../globals/constants';
import { referatBreadcrumb } from '../../globals/paths';
import { useBrev } from '../../queries/brev';
import { useSykmeldte } from '../../queries/sykmeldte';
import FeilAlertStripe from '../../components/FeilAlertStripe';
import MotereferatContent from './components/MotereferatContent';
import { getProgrammaticDateFormat } from '@/MVP/utils/dateUtils';

const texts = {
  title: 'Referat fra dialogmøte',
};

export const getReferat = (brev, date?) => {
  const referater = brev.filter(({ brevType }) => brevType === brevTypes.REFERAT);

  if (referater.length === 0) {
    return null;
  }

  if (!date) {
    return referater[0];
  }

  const referat = referater.find(({ tid }) => getProgrammaticDateFormat(tid) === date);

  if (!referat) {
    return null;
  }

  return referat;
};

interface MotereferatParams {
  narmestelederId: string;
  date: string;
}

const Motereferat = () => {
  const { narmestelederId, date } = useParams<MotereferatParams>();

  const sykmeldt = useSykmeldte(narmestelederId);
  const brev = useBrev(sykmeldt.data?.fnr);

  if (brev.isLoading || sykmeldt.isLoading) {
    return <AppSpinner />;
  }

  if (brev.isError) {
    return (
      <DialogmoteContainer title={texts.title} breadcrumb={referatBreadcrumb(sykmeldt.data)} displayTilbakeknapp>
        <FeilAlertStripe />;
      </DialogmoteContainer>
    );
  }

  const referat = getReferat(brev.data, date);

  const isLegacyHeader = referat?.document[0]?.type !== 'HEADER_H1';
  const pageHeader = isLegacyHeader ? texts.title : undefined;

  return (
    <DialogmoteContainer title={pageHeader} breadcrumb={referatBreadcrumb(sykmeldt.data)} displayTilbakeknapp>
      <MotereferatContent referat={referat} />
    </DialogmoteContainer>
  );
};

export default Motereferat;
