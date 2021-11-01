import { IkkeSykmeldtIcon } from '@/MVP/icons';
import React from 'react';
import styled from 'styled-components';

const texts = {
  text1: 'Dialogmøter er ikke aktuelt nå siden arbeidstakeren ikke er sykmeldt.',
};

const IkkeSykmeldtContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const IkkeSykmeldtContent = styled.div`
  align-self: center;
`;

const IkkeSykmeldtLanding = () => {
  return (
    <IkkeSykmeldtContentWrapper>
      <IkkeSykmeldtContent>
        <IkkeSykmeldtIcon />
      </IkkeSykmeldtContent>
      <IkkeSykmeldtContent style={{ marginBottom: '32px' }}>{texts.text1}</IkkeSykmeldtContent>
    </IkkeSykmeldtContentWrapper>
  );
};

IkkeSykmeldtLanding.propTypes = {};

export default IkkeSykmeldtLanding;
