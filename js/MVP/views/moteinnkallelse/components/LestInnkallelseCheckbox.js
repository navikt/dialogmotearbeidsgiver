import React from 'react';
import PropTypes from 'prop-types';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { useMutateBrevLest } from '../../../queries/brev';
import { brevTypes } from '../../../globals/constants';

const texts = {
  lestInnkallelse: 'Jeg bekrefter at jeg har lest denne innkallingen ',
  lestEndring: 'Jeg bekrefter at jeg har lest endringen',
};

const checkboxLabel = (type) => {
  switch (type) {
    case brevTypes.ENDRING:
      return texts.lestEndring;
    default:
      return texts.lestInnkallelse;
  }
};

const handleChange = (mutation, isRead, narmestelederId, brevUuid) => {
  if (!isRead) {
    mutation.mutate({ narmestelederId, brevUuid });
  }
};

const LestInnkallelseCheckbox = ({ type, brevUuid, isRead, narmestelederId }) => {
  const mutation = useMutateBrevLest();

  return (
    <BekreftCheckboksPanel
      label={checkboxLabel(type)}
      checked={isRead}
      onChange={() => handleChange(mutation, isRead, narmestelederId, brevUuid)}
    />
  );
};

LestInnkallelseCheckbox.propTypes = {
  type: PropTypes.string,
  brevUuid: PropTypes.string,
  isRead: PropTypes.bool,
  narmestelederId: PropTypes.string,
};

export default LestInnkallelseCheckbox;
