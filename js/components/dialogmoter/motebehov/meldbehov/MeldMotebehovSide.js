import React from 'react';
import PropTypes from 'prop-types';
import { motebehovReducerPt } from '../../../../propTypes';
import MeldMotebehovKvittering from './MeldMotebehovKvittering';
import MotebehovKvitteringSideButtonBack from '../MotebehovKvitteringSideButtonBack';

const MeldMotebehovKvitteringSide = ({ motebehov, koblingId }) => {
  return (
    <div>
      <MeldMotebehovKvittering koblingId={koblingId} motebehov={motebehov} />
      <MotebehovKvitteringSideButtonBack />
    </div>
  );
};
MeldMotebehovKvitteringSide.propTypes = {
  koblingId: PropTypes.number,
  motebehov: motebehovReducerPt,
};

export default MeldMotebehovKvitteringSide;
