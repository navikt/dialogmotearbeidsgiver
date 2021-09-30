import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import RouterLenke from '../../../components/RouterLenke';
import { getReferatUrl } from '../../../globals/paths';
import { getLongDateFormat, getProgrammaticDateFormat } from '../../../utils';

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

const MotereferatList = ({ referatDates, koblingId }) => {
  return (
    <ListStyled>
      {referatDates.map((date) => {
        const programmaticDate = getProgrammaticDateFormat(date);
        const formattedDate = getLongDateFormat(date);

        return (
          <RouterLenke
            key={date}
            to={`${getReferatUrl(koblingId)}/${programmaticDate}`}
          >{`${texts.referatlenke} ${formattedDate}`}</RouterLenke>
        );
      })}
    </ListStyled>
  );
};

MotereferatList.propTypes = { referatDates: PropTypes.array, koblingId: PropTypes.string };

const PreviousMotereferatPanel = ({ previousReferatDates, koblingId }) => {
  if (previousReferatDates.length === 0) return null;

  return (
    <DialogmotePanelStyled title={texts.title} icon="dokument">
      <MotereferatList referatDates={previousReferatDates} koblingId={koblingId} />
    </DialogmotePanelStyled>
  );
};

PreviousMotereferatPanel.propTypes = { previousReferatDates: PropTypes.array, koblingId: PropTypes.string };

export default PreviousMotereferatPanel;
