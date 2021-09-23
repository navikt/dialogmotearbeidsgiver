import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import PropTypes from 'prop-types';
import { UndertekstBold } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import styled from 'styled-components';
import { infoUrls } from '../data';

const AlertStripeStyled = styled(AlertStripeInfo)`
  margin-top: 32px;
`;

const SectionStyled = styled.section`
  padding-left: 8px;
`;

const texts = {
  title: 'Du kan finne mer informasjon på nav.no:',
};

const ListUrls = ({ documentKeys }) => {
  const infoKeys = Object.keys(infoUrls);
  const documentKeysSet = [...new Set(documentKeys)];
  const validDocumentKeys = documentKeysSet.filter((key) => infoKeys.includes(key));

  if (validDocumentKeys.length === 0) {
    return null;
  }

  return (
    <SectionStyled>
      {validDocumentKeys.map((key) => {
        const { text, url } = infoUrls[key];

        return (
          <li key={key}>
            <Lenke href={url}>{text}</Lenke>
          </li>
        );
      })}
    </SectionStyled>
  );
};

ListUrls.propTypes = { documentKeys: PropTypes.arrayOf(PropTypes.string) };

const LinkInfoBox = ({ documentKeys = [] }) => {
  const documentKeysFiltered = documentKeys.filter((key) => !!key);

  if (documentKeysFiltered.length === 0) {
    return null;
  }

  return (
    <AlertStripeStyled>
      <UndertekstBold>{texts.title}</UndertekstBold>
      <ListUrls documentKeys={documentKeysFiltered} />
    </AlertStripeStyled>
  );
};

LinkInfoBox.propTypes = { documentKeys: PropTypes.arrayOf(PropTypes.string) };

export default LinkInfoBox;
