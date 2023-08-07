/** @jsxImportSource @emotion/react */
'use client';

import styled from '@emotion/styled';
import { colors } from '@sulsul/token/src/colors';
import { text } from '@sulsul/token/src/text';
import { Button } from '@sulsul/ui';
import { DrinkReq, TitleDto, TitleDtoTitleEnum } from '~/api';
import { AlcoholDetails, AlcoholResultDetails } from '~/constants/alcohol';
import { ResultCard } from './ResultCard';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { css } from '@emotion/react';
import { shareResult } from '~/app/utils/share';
import { Box, Flex, Stack } from '@jsxcss/emotion';
import { SuspenseQuery } from '~/components/SuspenseQuery';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { useSuspenseQuery } from '@suspensive/react-query';

const Heading2 = styled.h2`
  ${text.heading[2]}
  color: ${colors.white};
  letter-spacing: -0.3px;
  margin-bottom: 16px;
`;

const Heading3 = styled.h3`
  ${text.heading[3]}
  color: ${colors.white};
  letter-spacing: -0.3px;
  margin-top: 48px;
  margin-bottom: 20px;
`;

const DrinkLists = styled.ul`
  padding: 0px 8px;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  & + & {
    border-top: 1px solid ${colors.grey[300]};
    padding-top: 16px;
  }
`;

const DrinkDetail = styled.div`
  display: flex;
  gap: 8px;
`;

const Heading5 = styled.h5`
  ${text.heading[5]};
  color: ${colors.white};
  letter-spacing: -0.1px;
`;

const Volumn = styled.p`
  ${text.subtitle[4]};
  color: ${colors.grey[800]};
  letter-spacing: -0.1px;
`;

export const ResultContents = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const drinkType = searchParams?.get('drinkType');
  const glasses = Number(searchParams?.get('glasses'));
  const baseY = useMotionValue(0);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const scrollHeight = backgroundRef.current?.scrollHeight ?? 0;
  const opacityOfY = useTransform(
    baseY,
    (v) => `${Math.max((v / scrollHeight) * 100, 30)}`
  );
  const { scrollY } = useScroll();

  // make background opacity change when body scroll
  useMotionValueEvent(scrollY, 'change', (latestScrollY) => {
    baseY.set(latestScrollY);
    backgroundRef.current?.style.setProperty(
      'background',
      `linear-gradient(to bottom, transparent 0%, #0008 ${opacityOfY.get()}%)`
    );
  });

  const resultQuery = useSuspenseQuery(['result', { drinkType, glasses }], () =>
    axios
      .get<{ title: TitleDto }>(
        `https://sulsul.app/api/v1/drinkingLimit?drinkType=${drinkType}&glass=${glasses}`
      )
      .then((response) => response.data)
  );

  const resultTitleData = resultQuery.data?.title;
  const resultTitle = resultTitleData?.title as TitleDtoTitleEnum;
  const resultSubTitle = resultTitleData?.subTitle;
  const { svg, mainColor, color1, color2 } = AlcoholResultDetails[resultTitle];

  const measureInApp = () => {
    if (globalThis?.window.sulsulBridge) {
      globalThis.window.sulsulBridge.onStartMeasureDrink();
      return;
    }

    const deep_link =
      'intent://measuring/#Intent;scheme=sulsul;package=com.mashup.alcoholfree;end';

    router.push(deep_link);
  };

  return (
    <Stack.Vertical
      color="white"
      css={css`
        position: relative;
        height: 100%;
        min-height: 100vh;
        background: url('/svgs/grainy.svg') repeat, #1f2229;
        background-size: contain;
        padding-top: 50px;
      `}
    >
      <Box
        css={css`
          height: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          max-width: 700px;
          width: 100vw;
          margin: 0 auto;
        `}
      >
        <div
          css={css`
            &::before {
              content: '';
              position: absolute;
              top: 150px;
              left: 0;
              background-color: ${color1};
              border-radius: 50%;
              box-shadow: 0px 0px 150px 150px ${color1};
              animation: move1 5s ease-in-out infinite;
            }

            &::after {
              content: '';
              position: absolute;
              bottom: 150px;
              right: 0;
              background-color: ${color2};
              border-radius: 50%;
              box-shadow: 0px 0px 150px 150px ${color2};
              animation: move2 5s ease-in-out infinite;
            }

            @keyframes move1 {
              0% {
                transform: translate(0, 0) scale(1);
              }
              50% {
                transform: translate(80px, 150px) scale(1.2) rotate(45deg);
              }
              100% {
                transform: translate(0, 0) scale(1);
              }
            }
            @keyframes move2 {
              0% {
                transform: translate(0, 0) scale(1);
              }
              50% {
                transform: translate(-150px, -50px) scale(1.2) rotate(45deg);
              }
              100% {
                transform: translate(0, 0) scale(1);
              }
            }
          `}
        />

        <Flex
          direction="column"
          css={css`
            position: relative;
          `}
        >
          <Stack.Vertical flex={1}>
            <div
              css={css`
                flex: 1;
                padding: 16px;
              `}
            >
              <Heading2>당신은...</Heading2>
              <ResultCard
                name={resultTitle}
                svg={svg}
                description={resultSubTitle}
                mainColor={mainColor}
              />
              <Heading3>다른 술은 얼마나 마실 수 있을까?</Heading3>
              <DrinkLists>
                <SuspenseQuery
                  options={{
                    queryKey: ['result', { drinkType, glasses }],
                    queryFn: () =>
                      axios
                        .get<{ drinks: DrinkReq[] }>(
                          `https://sulsul.app/api/v1/drinkingLimit?drinkType=${drinkType}&glass=${glasses}`
                        )
                        .then((response) => response.data),
                  }}
                >
                  {(query) =>
                    query.data.drinks.map((drinkRes) => {
                      const { drinkType, glass } = drinkRes;
                      const { name, SvgrIcon, volumn } = AlcoholDetails[drinkType];
                      return (
                        <ListItem key={drinkType}>
                          <DrinkDetail>
                            <Flex.Center
                              backgroundColor={colors.grey[200]}
                              width={40}
                              height={40}
                              borderRadius={8}
                            >
                              <SvgrIcon />
                            </Flex.Center>
                            <div>
                              <Heading5>{name}</Heading5>
                              <Volumn>{volumn}도</Volumn>
                            </div>
                          </DrinkDetail>
                          <Heading5>{glass}잔</Heading5>
                        </ListItem>
                      );
                    })
                  }
                </SuspenseQuery>
              </DrinkLists>
            </div>
          </Stack.Vertical>
        </Flex>
      </Box>
      <motion.div
        style={{
          position: 'sticky',
          bottom: 0,
          padding: '100px 16px 16px 16px',
          width: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, #0008 30%)',
        }}
        ref={backgroundRef}
      >
        <Stack.Vertical spacing={8} width="100%" margin="0 auto" maxWidth={700}>
          <Button type="button" onClick={shareResult} size="lg">
            내 주량 공유하기
          </Button>
          <Button type="button" appearance="primary" size="lg" onClick={measureInApp}>
            술자리에서 측정하기
          </Button>
        </Stack.Vertical>
      </motion.div>
    </Stack.Vertical>
  );
};
