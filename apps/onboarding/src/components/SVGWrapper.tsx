'use client';

import styled from '@emotion/styled';
import { forwardRef, PropsWithChildren } from 'react';

type SVGWrapperProps = {
  style?: React.CSSProperties;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  & svg {
    width: auto;
    height: auto;
  }
`;

export const SVGWrapper = forwardRef<HTMLDivElement, PropsWithChildren<SVGWrapperProps>>(
  (props, ref) => {
    const { children, style, ...rest } = props;
    return (
      <Wrapper ref={ref} style={style} {...rest}>
        {children}
      </Wrapper>
    );
  }
);

SVGWrapper.displayName = 'SVGWrapper';
