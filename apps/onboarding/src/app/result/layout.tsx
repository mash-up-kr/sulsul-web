'use client';

import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { getLevelDetails } from './service';
import { useSearchParams, useRouter } from 'next/navigation';

type backgroundColorProps = {
  color1: string;
  color2: string;
};

const Background = styled.div`
  background: url('/icons/grainy.svg') repeat, #1f2229;
  background-size: contain;
`;

const move1 = keyframes`
    0% {
        transform: translate(0, 0) scale(1);
    }
    50% { 
        transform: translate(80px, 150px) scale(1.2) rotate(45deg);
    }
    100% {
        transform: translate(0, 0) scale(1);
    }
`;

const move2 = keyframes`
    0% {
        transform: translate(0, 0) scale(1);
    }
    50% { 
        transform: translate(-150px, -50px) scale(1.2) rotate(45deg);
    }
    100% {
        transform: translate(0, 0) scale(1);
    }
`;

const Section = styled.section<backgroundColorProps>`
  position: relative;
  max-width: 700px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: 150px;
    left: 0;
    width: 100px;
    height: 100px;
    background-color: ${({ color1 }) => color1};
    border-radius: 50%;
    box-shadow: 0px 0px 150px 150px ${({ color1 }) => color1};
    animation: ${move1} 5s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 150px;
    right: 0;
    width: 100px;
    height: 100px;
    background-color: ${({ color2 }) => color2};
    border-radius: 50%;
    box-shadow: 0px 0px 150px 150px ${({ color2 }) => color2};
    animation: ${move2} 5s ease-in-out infinite;
  }
`;

const Wrapper = styled.article`
  position: relative;
  z-index: 1;
`;

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const glasses = Number(searchParams.get('glasses'));

  // if query is not a number, redirect to home
  if (Number.isNaN(glasses)) router.replace('/');

  const { color1, color2 } = getLevelDetails(glasses);

  return (
    <Background>
      <Section color1={color1} color2={color2}>
        <Wrapper>{children}</Wrapper>
      </Section>
    </Background>
  );
};

export default Layout;
