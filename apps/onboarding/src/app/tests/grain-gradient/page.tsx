'use client';

import { css } from '@emotion/react';
import { Box, Flex } from '@jsxcss/emotion';
import { ComponentProps, PropsWithChildren } from 'react';

export default function Page() {
  return (
    <GrainGradient
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      `}
    >
      <Flex.Center height="100%" color="#ffffff" fontWeight={900} fontSize={[30, 50]}>
        GrainGradient
      </Flex.Center>
    </GrainGradient>
  );
}

const GrainGradient = ({
  children,
  className,
}: PropsWithChildren<Pick<ComponentProps<'div'>, 'className'>>) => (
  <Box position="relative" className={className}>
    <Box position="absolute" top={0} left={0} right={0} bottom={0}>
      <div
        css={css`
          background-color: #e7d9bf;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        `}
      />
      <svg width={200}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" />
        </filter>
      </svg>
      <div
        css={css`
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        `}
      >
        <div
          css={css`
            border-radius: 50%;
            background: radial-gradient(closest-side, #edb74d, #edb74d00);
            position: absolute;
            top: 200px;
            left: 100px;
            height: 60vmax;
            width: 60vmax;

            animation: yellow 8s infinite ease;

            @keyframes yellow {
              0% {
                top: 200px;
                left: 100px;
                transform: scale(1);
              }
              30% {
                top: 300px;
                left: 150px;
                transform: scale(1.2);
              }
              60% {
                top: 100px;
                left: 200px;
                transform: scale(1.3);
              }
              100% {
                top: 200px;
                left: 100px;
                transform: scale(1);
              }
            }
          `}
        />
        <div
          css={css`
            border-radius: 50%;
            background: radial-gradient(closest-side, #eb6666, #eb666600);
            position: absolute;
            right: 0px;
            top: 0px;
            height: 80vmax;
            width: 70vmax;

            animation: red 8s infinite linear;

            @keyframes red {
              0% {
                top: -250px;
                right: 0px;
                transform: scale(1);
              }
              30% {
                top: -150px;
                right: -150px;
                transform: scale(1.4);
              }
              60% {
                top: 250px;
                right: 100px;
                transform: scale(1);
              }
              100% {
                top: -250px;
                right: 0px;
                transform: scale(1);
              }
            }
          `}
        />
        <div
          css={css`
            border-radius: 50%;
            background: radial-gradient(closest-side, #6fb18a, #6fb18a00);
            position: absolute;
            top: 80px;
            right: -20px;
            height: 60vmax;
            width: 50vmax;

            animation: green 8s infinite ease;

            @keyframes green {
              0% {
                top: 80px;
                right: -20px;
                transform: scale(1.2);
              }
              30% {
                top: 300px;
                right: -20px;
                transform: scale(1);
              }
              60% {
                top: 200px;
                right: 100px;
                transform: scale(1);
              }
              100% {
                top: 80px;
                right: -20px;
                transform: scale(1.2);
              }
            }
          `}
        />
      </div>
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.5;
          filter: url(#noiseFilter);
          mix-blend-mode: overlay;
        `}
      />
      <Box position={'absolute'} top={0} left={0} right={0} bottom={0}>
        {children}
      </Box>
    </Box>
  </Box>
);
