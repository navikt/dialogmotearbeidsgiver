import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tekstomrade from 'nav-frontend-tekstomrade';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import ButtonLenke from '../../../components/ButtonLenke';
import { getReferatUrl } from '@/MVP/globals/paths';
import { DokumentIcon } from '@/MVP/icons';
import { eventNames } from '@/amplitude/events';

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin-top: 32px;
`;

const TekstomradeStyled = styled(Tekstomrade)`
  margin: 32px 0;
`;

const texts = {
  title: 'Referat fra siste dialogmøte',
  text: 'Referatet oppsummerer det dere snakket om i dialogmøtet ',
  button: 'Les referatet',
};

const text = (date) => {
  return `Referatet oppsummerer det dere snakket om i dialogmøtet ${date}`;
};

const MotereferatPanel = ({ date, narmestelederId }) => {
  return (
    <DialogmotePanelStyled title={texts.title} icon={<DokumentIcon />}>
      <TekstomradeStyled>{text(date)}</TekstomradeStyled>
      <ButtonLenke mini to={getReferatUrl(narmestelederId)} trackingName={eventNames.aktivtReferat}>
        {texts.button}
      </ButtonLenke>
    </DialogmotePanelStyled>
  );
};

MotereferatPanel.propTypes = { date: PropTypes.string, narmestelederId: PropTypes.string };

export default MotereferatPanel;
