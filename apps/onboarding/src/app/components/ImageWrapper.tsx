import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

interface ImageWrapperProps {
  width: number;
  height: number;
}

const Wrapper = styled.div<ImageWrapperProps>`
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: ${({ width }) => width}px;
  aspect-ratio: ${({ width, height }) => width / height};

  & img {
    object-fit: 'contain';
  }
`;

const ImageWrapper = ({
  width,
  height,
  children,
}: PropsWithChildren<ImageWrapperProps>) => {
  return (
    <Wrapper width={width} height={height}>
      {children}
    </Wrapper>
  );
};

export default ImageWrapper;
