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

const handleChange = (mutation, isRead, koblingId, brevUuid) => {
  if (!isRead) {
    mutation.mutate({ koblingId, brevUuid });
  }
};

const LestInnkallelseCheckbox = ({ type, brevUuid, isRead, koblingId }) => {
  const mutation = useMutateBrevLest();

  return (
    <BekreftCheckboksPanel
      label={checkboxLabel(type)}
      checked={isRead}
      onChange={() => handleChange(mutation, isRead, koblingId, brevUuid)}
    />
  );
};

LestInnkallelseCheckbox.propTypes = {
  type: PropTypes.string,
  brevUuid: PropTypes.string,
  isRead: PropTypes.bool,
  koblingId: PropTypes.string,
};

export default LestInnkallelseCheckbox;
