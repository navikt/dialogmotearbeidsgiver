import AlertStripe from 'nav-frontend-alertstriper';
import React from 'react';
import styled from 'styled-components';

const AlertstripeStyled = styled(AlertStripe)`
  margin-top: 32px;
  margin-bottom: 64px;
`;

const NoInnkallelseAlert = () => {
  return <AlertstripeStyled type="feil">Vi finner ikke noe møteinnkallelse.</AlertstripeStyled>;
};

export default NoInnkallelseAlert;
