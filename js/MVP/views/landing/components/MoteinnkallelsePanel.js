import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import ButtonLenke from '../../../components/ButtonLenke';
import { getMoteinnkallelseUrl } from '../../../globals/paths';
import { motePtMVP } from '../../../../propTypes';
import { brevTypes } from '../../../globals/constants';
import { KalenderInnkallingAvlystIcon, KalenderInnkallingIcon } from '../../../icons';

const SectionStyled = styled.section`
  margin: 32px 0;
`;

const texts = {
  title: 'Du er innkalt til dialogmøte',
  text: 'Sjekk om tidspunktet passer og hva du bør gjøre før møtet.',
  buttonInnkallingen: 'Se innkallingen',
  titleEndring: 'Dialogmøtet er flyttet',
  textEndring: 'Dialogmøtet du er innkalt til, har fått nytt tidspunkt eller sted.',
  buttonEndring: 'Se endringen',
  titleAvlysning: 'Dialogmøtet er avlyst',
  textAvlysning: 'Dialogmøtet du er innkalt til, er avlyst.',
  buttonAvlysning: 'Se avlysningen',
};

const Panel = ({ title, text, icon, buttonText, koblingId }) => {
  return (
    <DialogmotePanel title={title} icon={icon}>
      <SectionStyled>{text}</SectionStyled>
      <ButtonLenke mini to={getMoteinnkallelseUrl(koblingId)}>
        {buttonText}
      </ButtonLenke>
    </DialogmotePanel>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.element,
  buttonText: PropTypes.string,
  koblingId: PropTypes.string,
};

const MoteinnkallelsePanel = ({ innkallelse, koblingId }) => {
  if (innkallelse.brevType === brevTypes.AVLYST) {
    return (
      <Panel
        title={texts.titleAvlysning}
        text={texts.textAvlysning}
        icon={<KalenderInnkallingAvlystIcon />}
        buttonText={texts.buttonAvlysning}
        koblingId={koblingId}
      />
    );
  }

  if (innkallelse.brevType === brevTypes.ENDRING) {
    return (
      <Panel
        title={texts.titleEndring}
        text={texts.textEndring}
        icon={<KalenderInnkallingIcon />}
        buttonText={texts.buttonEndring}
        koblingId={koblingId}
      />
    );
  }

  return (
    <Panel
      title={texts.title}
      text={texts.text}
      icon={<KalenderInnkallingIcon />}
      buttonText={texts.buttonInnkallingen}
      koblingId={koblingId}
    />
  );
};

MoteinnkallelsePanel.propTypes = { innkallelse: motePtMVP, koblingId: PropTypes.string };

export default MoteinnkallelsePanel;
