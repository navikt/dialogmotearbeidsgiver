import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import RouterLenke from '../../../components/RouterLenke';
import { getReferatUrl } from '@/MVP/globals/paths';
import { getLongDateFormat, getProgrammaticDateFormat } from '../../../utils';
import { DokumentIcon } from '@/MVP/icons';
import { eventNames } from '@/amplitude/events';

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin-top: 32px;
`;

const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const texts = {
  title: 'Referat fra tidligere dialogmøter',
  referatlenke: 'Referat fra møtet',
};

const MotereferatList = ({ referatDates, narmestelederId }) => {
  return (
    <ListStyled>
      {referatDates.map((date) => {
        const programmaticDate = getProgrammaticDateFormat(date);
        const formattedDate = getLongDateFormat(date);

        return (
          <RouterLenke
            trackingName={eventNames.tidligereReferat}
            key={date}
            to={`${getReferatUrl(narmestelederId)}/${programmaticDate}`}
          >{`${texts.referatlenke} ${formattedDate}`}</RouterLenke>
        );
      })}
    </ListStyled>
  );
};

MotereferatList.propTypes = { referatDates: PropTypes.array, narmestelederId: PropTypes.string };

const PreviousMotereferatPanel = ({ previousReferatDates, narmestelederId }) => {
  if (previousReferatDates.length === 0) return null;

  return (
    <DialogmotePanelStyled title={texts.title} icon={<DokumentIcon />}>
      <MotereferatList referatDates={previousReferatDates} narmestelederId={narmestelederId} />
    </DialogmotePanelStyled>
  );
};

PreviousMotereferatPanel.propTypes = { previousReferatDates: PropTypes.array, narmestelederId: PropTypes.string };

export default PreviousMotereferatPanel;
