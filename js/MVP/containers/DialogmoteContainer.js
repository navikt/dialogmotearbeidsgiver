import React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Brodsmuler from '../../components/Brodsmuler';
import { dialogmoteBreadcrumb } from '../globals/paths';

const WrappperStyled = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f1f1f1;
  padding: 32px;
`;

const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: stretch;
  max-width: 640px;
`;

const HeaderStyled = styled.header`
  margin: 32px 0;
  text-align: center;
`;

const BottomInfoStyled = styled.section`
  text-align: center;
  margin-top: auto;
`;

const texts = {
  bottomText: 'Vi bruker opplysningene også til å gjøre selve tjenesten bedre.',
  bottomUrl: 'Les mer om hvordan NAV behandler personopplysninger.',
};

const DialogmoteContainer = ({ title, breadcrumb = dialogmoteBreadcrumb, children }) => {
  return (
    <WrappperStyled>
      <ContentStyled>
        <Brodsmuler brodsmuler={breadcrumb} />
        <HeaderStyled>
          <Sidetittel>{title}</Sidetittel>
        </HeaderStyled>
        {children}
        <BottomInfoStyled>
          <Normaltekst>{texts.bottomText}</Normaltekst>
          <Lenke>{texts.bottomUrl}</Lenke>
        </BottomInfoStyled>
      </ContentStyled>
    </WrappperStyled>
  );
};

DialogmoteContainer.propTypes = { title: PropTypes.string, children: PropTypes.node, breadcrumb: PropTypes.array };

export default DialogmoteContainer;
