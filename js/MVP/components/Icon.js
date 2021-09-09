import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const SvgContainer = styled.div`
  height: 'auto';
  width: 'auto';
  display: inline-flex;
  align-items: center;
  justify-content: center;

  & img {
    height: ${(props) => (props.height ? `${props.height}px` : '100%')};
    width: ${(props) => (props.width ? `${props.width}px` : '100%')};
    padding-right: ${(props) => (props.rightPadding ? `${props.rightPadding}` : '0')};
  }
`;

const getIconPath = (iconName) => {
  return `${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/${iconName}.svg`;
};

const Icon = ({ icon, ...props }) => {
  if (!icon) {
    return null;
  }

  return (
    <SvgContainer {...props}>
      <img src={getIconPath(icon)} alt="" />
    </SvgContainer>
  );
};

Icon.propTypes = { icon: PropTypes.string, width: PropTypes.number, height: PropTypes.number };

export default Icon;
