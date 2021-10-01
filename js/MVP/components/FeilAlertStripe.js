import React from 'react';
import styled from 'styled-components';
import AlertStripe from 'nav-frontend-alertstriper';

const AlertStripeStyled = styled(AlertStripe)`
  margin-bottom: 32px;
`;

const texts = {
  feil:
    'Akkurat nå mangler det noe her. Vi har tekniske problemer som vi jobber med å løse. Prøv gjerne igjen om en stund.',
};

const FeilAlertStripe = () => {
  return <AlertStripeStyled type="feil">{texts.feil}</AlertStripeStyled>;
};

FeilAlertStripe.propTypes = {};

export default FeilAlertStripe;
