'use client';

import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Background = styled.div`
  background: url('/icons/grainy.svg') repeat, #1f2229;
`;

const move1 = keyframes`
    0% {
        transform: translate(0, 0) scale(1);
    }
    50% { 
        transform: translate(50px, 150px) scale(1.2);
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
        transform: translate(-150px, -50px) scale(1.2);
    }
    100% {
        transform: translate(0, 0) scale(1);
    }
`;

const Section = styled.section`
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
    background-color: rgba(224, 95, 254, 0.3);
    border-radius: 50%;
    box-shadow: 0px 0px 150px 150px rgba(224, 95, 254, 0.3);
    animation: ${move1} 3s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 150px;
    right: 0;
    width: 100px;
    height: 100px;
    background-color: #4c94ff30;
    border-radius: 50%;
    box-shadow: 0px 0px 150px 150px #4c94ff30;
    animation: ${move2} 3s ease-in-out infinite;
  }
`;

const Wrapper = styled.article`
  position: relative;
  z-index: 1;
`;

const Layout = ({ children }: PropsWithChildren) => (
  <Background>
    <Section>
      <Wrapper>{children}</Wrapper>
    </Section>
  </Background>
);

export default Layout;
