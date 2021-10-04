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

const handleChange = (mutation, isRead, varselUuid) => {
  if (!isRead) {
    mutation.mutate({ uuid: varselUuid });
  }
};

const LestInnkallelseCheckbox = ({ type, varselUuid, isRead }) => {
  const mutation = useMutateBrevLest();

  return (
    <BekreftCheckboksPanel
      label={checkboxLabel(type)}
      checked={isRead}
      onChange={() => handleChange(mutation, isRead, varselUuid)}
    />
  );
};

LestInnkallelseCheckbox.propTypes = { type: PropTypes.string, varselUuid: PropTypes.string, isRead: PropTypes.bool };

export default LestInnkallelseCheckbox;
