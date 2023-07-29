/** @jsxImportSource @emotion/react */

'use client';
import { css } from '@emotion/react';
import { Stack, Box, Flex } from '@jsxcss/emotion';
import { token } from '@sulsul/token';
import { Button, StackView, useStackBall } from '@sulsul/ui';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DrinkResDrinkTypeEnum } from '~/api';
import IcBack from '~/assets/icons/navigations/ic-back.svg';
import IcDoublechevronLeft from '~/assets/icons/ic_doublechevron_left.svg';
import IcDoublechevronRight from '~/assets/icons/ic_doublechevron_right.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { drinkImage } from '~/constants/alcohol';
// import IcRefresh from '~/assets/icons/navigations/ic-refresh.svg';

const DRINK_TYPE_SELECTOR_WIDTH = 200;

const drinkTypes = [
  DrinkResDrinkTypeEnum.고량주,
  DrinkResDrinkTypeEnum.맥주,
  DrinkResDrinkTypeEnum.소주,
  DrinkResDrinkTypeEnum.와인,
  DrinkResDrinkTypeEnum.위스키,
] as const;

const measurePageSchema = z.object({
  drinkType: z.enum(drinkTypes),
  drinks: z.enum(drinkTypes).array(),
});

type MeasurePageFormValues = z.infer<typeof measurePageSchema>;

export default function MeasurePage() {
  const router = useRouter();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { addBall, removeBall, boxRef, canvasRef } = useStackBall();
  const { setValue, watch } = useForm<MeasurePageFormValues>({
    defaultValues: {
      drinkType: '고량주',
      drinks: [],
    },
    mode: 'all',
    resolver: zodResolver(measurePageSchema),
  });

  const [drinkType, drinks] = watch(['drinkType', 'drinks']);
  const activeDrinkIndex = drinkTypes.findIndex((item) => item === drinkType);

  const addDrink = () => {
    const { image, size } = drinkImage[drinkTypes[activeDrinkIndex]];

    console.log(image, size);
    setValue('drinks', [...drinks, drinkType]);
    addBall(image, size);
  };
  const removeDrink = () => {
    setValue('drinks', drinks.slice(0, -1));
    removeBall();
  };

  const sendResult = () => {
    router.push(`/result?drinkType=${drinkType}&glasses=${drinks.length}`);
  };

  return (
    <Stack.Vertical
      color="white"
      justify="center"
      css={css`
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: url('/svgs/grainy.svg') repeat, #1f2229;
        background-size: contain;
      `}
    >
      <Box as="section" css={sectionCss}>
        <Stack.Horizontal justify="space-between" align="center" padding="8px 16px">
          <IcBack onClick={() => router.push('/')} />
          <div>{/* <IcRefresh /> */}</div>
        </Stack.Horizontal>
        <Stack.Vertical spacing={20}>
          <Stack.Vertical textAlign="center">
            <Box
              as="h1"
              css={{
                ...token.text.subtitle[3],
                color: token.colors.primary[300],
              }}
            >
              주량 등록하기
            </Box>
            <Stack.Vertical
              justify="center"
              spacing={4}
              css={{
                ...token.text.heading[4],
              }}
            >
              <div>평소에 즐겨마시는 술로</div>
              <div>주량을 알려주세요</div>
            </Stack.Vertical>
          </Stack.Vertical>
          <Flex direction="row" width={DRINK_TYPE_SELECTOR_WIDTH + 40 + 40} margin="auto">
            <Box as={motion.button} height={40} minWidth={40} whileTap={{ scale: 0.8 }}>
              {drinkTypes[activeDrinkIndex - 1] && (
                <IcDoublechevronLeft
                  onClick={() => setValue('drinkType', drinkTypes[activeDrinkIndex - 1])}
                />
              )}
            </Box>
            <Flex.Center
              overflow="hidden"
              ref={constraintsRef}
              width={400}
              height={40}
              margin="auto"
            >
              <Stack.Horizontal
                as={motion.div}
                onDragEnd={(_, info) => {
                  const offset = info.offset.x;
                  if (Math.abs(offset) > 20) {
                    const direction = offset < 0 ? 1 : -1;

                    const nextDrinkType = drinkTypes[activeDrinkIndex + direction];
                    if (nextDrinkType) {
                      setValue('drinkType', nextDrinkType);
                    }
                  }
                }}
                dragConstraints={constraintsRef}
                drag="x"
                css={css`
                  height: 40px;
                  display: flex;
                  flex-direction: row;
                `}
                animate={{
                  x:
                    -1 *
                      activeDrinkIndex *
                      ((constraintsRef.current?.offsetWidth ||
                        DRINK_TYPE_SELECTOR_WIDTH) /
                        2) +
                    (constraintsRef.current?.offsetWidth || DRINK_TYPE_SELECTOR_WIDTH),
                }}
              >
                {drinkTypes.map((drinkType) => (
                  <Flex.Center
                    key={drinkType}
                    width={
                      (constraintsRef.current?.offsetWidth ?? DRINK_TYPE_SELECTOR_WIDTH) /
                      2
                    }
                    height={40}
                    {...token.text.heading[1]}
                  >
                    {drinkType}
                  </Flex.Center>
                ))}
              </Stack.Horizontal>
            </Flex.Center>
            <Box as={motion.button} height={40} minWidth={40} whileTap={{ scale: 0.8 }}>
              {drinkTypes[activeDrinkIndex + 1] && (
                <IcDoublechevronRight
                  onClick={() => setValue('drinkType', drinkTypes[activeDrinkIndex + 1])}
                />
              )}
            </Box>
          </Flex>
        </Stack.Vertical>
        <Box flex={1}>
          <StackView boxRef={boxRef} canvasRef={canvasRef} />
        </Box>
        <Stack.Vertical spacing={16} padding="0 16px 40px 16px">
          <Flex.Center>
            <Stack.Vertical>
              <Stack.Horizontal spacing={10} justify="center">
                <Box
                  as="button"
                  css={{ ...token.text.heading[2], color: token.colors.white }}
                  onClick={removeDrink}
                >
                  -
                </Box>
                <Box as="p" css={{ ...token.text.heading[2] }}>
                  {drinks.length}잔
                </Box>
                <Box
                  as="button"
                  css={{ ...token.text.heading[2], color: token.colors.white }}
                  onClick={addDrink}
                >
                  +
                </Box>
              </Stack.Horizontal>
              <p>350ml, 0.3병</p>
            </Stack.Vertical>
          </Flex.Center>
          <Button type="button" appearance="primary" size="lg" onClick={sendResult}>
            다 입력했어요
          </Button>
        </Stack.Vertical>
      </Box>
    </Stack.Vertical>
  );
}

const sectionCss = css`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 700px;
  width: 100vw;
  margin: 0 auto;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 150px;
    left: 0;
    background-color: #f97c7280;
    border-radius: 50%;
    box-shadow: 0px 0px 150px 150px #f97c7280;
    animation: move1 5s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 150px;
    right: 0;
    background-color: #4c94ff80;
    border-radius: 50%;
    box-shadow: 0px 0px 150px 150px #4c94ff80;
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
`;
