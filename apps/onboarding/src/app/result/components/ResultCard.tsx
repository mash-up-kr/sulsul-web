'use client';

import styled from '@emotion/styled';
import { colors } from '@sulsul/token/src/colors';
import { text } from '@sulsul/token/src/text';
import { SVGWrapper } from '~/components/SVGWrapper';

interface ResultCardProps {
  mainColor: string;
  name: string;
  description: string;
  svg: React.ReactNode;
}

const Heading1 = styled.h1`
  ${text.heading[1]};
  color: white;
  letter-spacing: -0.3px;
  margin-bottom: 4px;
`;

const BorderWrapper = styled.div`
  margin: auto;
  padding: 1px;
  width: 100%;
  max-width: 328px;
  border-radius: 16px;
  background-image: linear-gradient(#23272e, #23272e),
    linear-gradient(135deg, #23272e, #fff8, #23272e);
  background-origin: border-box;
  background-clip: content-box, border-box;
  overflow: hidden;
`;

const ResultWrapper = styled.div<{ mainColor: string }>`
  position: relative;
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background: url('/svgs/grainy.svg') center center / contain;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background-color: ${({ mainColor }) => mainColor};
    box-shadow: 0px 0px 100px 100px ${({ mainColor }) => mainColor};
  }
`;

const Description = styled.span`
  border-radius: 8px;
  padding: 4px 8px;
  margin-bottom: 16px;
  color: ${colors.purple};
  background: rgba(187, 182, 255, 0.16);
`;

export const ResultCard = ({ mainColor, name, description, svg }: ResultCardProps) => {
  return (
    <BorderWrapper>
      <ResultWrapper mainColor={mainColor}>
        <Heading1>{name}</Heading1>
        <Description>{description}</Description>
        <SVGWrapper>{svg}</SVGWrapper>
      </ResultWrapper>
    </BorderWrapper>
  );
};
