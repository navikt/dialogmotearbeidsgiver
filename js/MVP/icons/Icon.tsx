import React from 'react';
import styled from 'styled-components';

interface SvgContainerProps {
  height?: number;
  width?: number;
  rightPadding?: number;
}

export const SvgContainer = styled.div<SvgContainerProps>`
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

interface Props extends SvgContainerProps {
  icon?: string;
}

const Icon = ({ icon, ...props }: Props) => {
  if (!icon) {
    return null;
  }

  return (
    <SvgContainer {...props}>
      <img src={icon} alt="" />
    </SvgContainer>
  );
};

export default Icon;
