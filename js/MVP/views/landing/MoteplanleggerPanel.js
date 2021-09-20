import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ButtonLenke from '../../components/ButtonLenke';
import DialogmotePanel from '../../containers/DialogmotePanel';
import { LANDING_URL } from '../../globals/paths';

const SectionStyled = styled.section`
  margin: 32px 0;
`;

const texts = {
  title: 'Tidspunkt for dialogmøte',
  text: 'Her er vårt forslag til tidspunkt for dialogmøte.',
  button: 'Svar på om det passer',
};

const Panel = ({ title, text, icon, buttonText, koblingId }) => {
  return (
    <DialogmotePanel title={title} icon={icon}>
      <SectionStyled>{text}</SectionStyled>
      <ButtonLenke mini to={`${LANDING_URL}/${koblingId}/mote`}>
        {buttonText}
      </ButtonLenke>
    </DialogmotePanel>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  buttonText: PropTypes.string,
  koblingId: PropTypes.string,
};

const MoteplanleggerPanel = (data) => {
  return (
    <Panel
      title={texts.title}
      text={texts.text}
      icon="kalender-innkalling"
      buttonText={texts.button}
      koblingId={data.koblingId}
    />
  );
};

MoteplanleggerPanel.propTypes = { data: PropTypes.object };

export default MoteplanleggerPanel;
