import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { documentComponentPtMVP } from '../../propTypes';
import DocumentRenderer from '../components/DocumentRenderer';

const DocumentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 4px;
  padding: 32px;
  background-color: white;
  margin-top: 32px;
`;

const DocumentContainer = ({ document, className, children }) => {
  return (
    <DocumentWrapperStyled className={className}>
      {document.map((documentComponent, index) => (
        <section key={index}>
          <DocumentRenderer documentComponent={documentComponent} />
        </section>
      ))}
      {children}
    </DocumentWrapperStyled>
  );
};

DocumentContainer.propTypes = {
  document: PropTypes.arrayOf(documentComponentPtMVP),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DocumentContainer;
