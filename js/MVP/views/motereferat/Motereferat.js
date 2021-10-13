import React from 'react';
import PropTypes from 'prop-types';
import AppSpinner from '../../../components/AppSpinner';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { brevTypes } from '../../globals/constants';
import { referatBreadcrumb } from '../../globals/paths';
import { useBrev } from '../../queries/brev';
import { useSykmeldte } from '../../queries/sykmeldte';
import { getProgrammaticDateFormat } from '../../utils';
import FeilAlertStripe from '../../components/FeilAlertStripe';
import MotereferatContent from './components/MotereferatContent';

const texts = {
  title: 'Referat fra dialogmøte',
};

const getReferat = (brev, date) => {
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

const Motereferat = ({ params }) => {
  const { narmestelederId, date } = params;

  const brev = useBrev(narmestelederId);
  const sykmeldt = useSykmeldte(narmestelederId);

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

  return (
    <DialogmoteContainer title={texts.title} breadcrumb={referatBreadcrumb(sykmeldt.data)} displayTilbakeknapp>
      <MotereferatContent referat={referat} />
    </DialogmoteContainer>
  );
};

Motereferat.propTypes = {
  params: PropTypes.object,
};

export default Motereferat;
