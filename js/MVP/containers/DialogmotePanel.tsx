import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Systemtittel } from 'nav-frontend-typografi';

const PanelStyled = styled.div`
  padding: 32px;
  background-color: white;
  border-radius: 4px;
`;

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  gap: 16px;
`;

export interface DialogmotePanelProps {
  title: string;
  icon: ReactNode;
  className?: string;
  children: ReactNode;
}

const DialogmotePanel = ({ title, icon, className, children }: DialogmotePanelProps) => {
  const hasHeader = !!title || !!icon;

  return (
    <PanelStyled className={className}>
      {hasHeader && (
        <HeaderStyled>
          {icon}
          <Systemtittel>{title}</Systemtittel>
        </HeaderStyled>
      )}
      {children}
    </PanelStyled>
  );
};

export default DialogmotePanel;
