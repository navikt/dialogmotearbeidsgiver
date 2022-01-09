import { DocumentComponent } from '@/api/types/brevTypes';
import { useMutateBrevLest } from '@/MVP/queries/brev';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import DocumentRenderer from '../components/DocumentRenderer';

const DocumentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 4px;
  padding: 32px;
  background-color: white;
  margin-top: 32px;
  white-space: pre-wrap;
`;

interface DocumentContainerProps {
  document: DocumentComponent[];
  className?: string;
  children?: React.ReactNode;
  lestDato?: string;
  brevUuid: string;
}

const DocumentContainer = ({ document, lestDato, brevUuid, className, children }: DocumentContainerProps) => {
  const mutation = useMutateBrevLest();

  useEffect(() => {
    if (brevUuid && !lestDato && !mutation.isLoading) {
      mutation.mutate({ brevUuid });
    }
  }, [lestDato, mutation, brevUuid]);

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

export default DocumentContainer;
