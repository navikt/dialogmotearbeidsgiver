import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tekstomrade from 'nav-frontend-tekstomrade';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import ButtonLenke from '../../../components/ButtonLenke';
import { getReferatUrl } from '../../../globals/paths';

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

const MotereferatPanel = ({ date, koblingId }) => {
  return (
    <DialogmotePanelStyled title={texts.title} icon="dokument">
      <TekstomradeStyled>{text(date)}</TekstomradeStyled>
      <ButtonLenke mini to={getReferatUrl(koblingId)}>
        {texts.button}
      </ButtonLenke>
    </DialogmotePanelStyled>
  );
};

MotereferatPanel.propTypes = { date: PropTypes.string, koblingId: PropTypes.string };

export default MotereferatPanel;
