import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Systemtittel } from 'nav-frontend-typografi';
import Icon from '../components/Icon';

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

const DialogmotePanel = ({ title, icon, className, children }) => {
  const hasHeader = !!title || !!icon;

  return (
    <PanelStyled className={className}>
      {hasHeader && (
        <HeaderStyled>
          <Icon icon={icon} />
          <Systemtittel>{title}</Systemtittel>
        </HeaderStyled>
      )}
      {children}
    </PanelStyled>
  );
};

DialogmotePanel.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DialogmotePanel;
