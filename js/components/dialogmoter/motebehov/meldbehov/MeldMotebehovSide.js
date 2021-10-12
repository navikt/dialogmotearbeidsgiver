import React from 'react';
import PropTypes from 'prop-types';
import { motebehovReducerPt } from '../../../../propTypes';
import MeldMotebehovKvittering from './MeldMotebehovKvittering';
import MotebehovKvitteringSideButtonBack from '../MotebehovKvitteringSideButtonBack';

const MeldMotebehovKvitteringSide = ({ motebehov, narmestelederId }) => {
  return (
    <div>
      <MeldMotebehovKvittering narmestelederId={narmestelederId} motebehov={motebehov} />
      <MotebehovKvitteringSideButtonBack />
    </div>
  );
};
MeldMotebehovKvitteringSide.propTypes = {
  narmestelederId: PropTypes.string,
  motebehov: motebehovReducerPt,
};

export default MeldMotebehovKvitteringSide;
