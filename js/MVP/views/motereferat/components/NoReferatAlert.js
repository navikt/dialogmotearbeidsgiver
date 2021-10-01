import AlertStripe from 'nav-frontend-alertstriper';
import React from 'react';
import styled from 'styled-components';

const AlertstripeStyled = styled(AlertStripe)`
  margin-top: 32px;
  margin-bottom: 64px;
`;

const NoReferatAlert = () => {
  return <AlertstripeStyled type="feil">Vi finner ikke noen referat knyttet til denne datoen.</AlertstripeStyled>;
};

export default NoReferatAlert;
