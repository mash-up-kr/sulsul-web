'use client';
import { css } from '@emotion/react';
import { Stack, Box, Flex } from '@jsxcss/emotion';
import { token } from '@sulsul/token';
import { Button } from '@sulsul/ui';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DrinkResDrinkTypeEnum } from '~/api';
import IcBack from '~/assets/icons/navigations/ic-back.svg';
import IcDoublechevronLeft from '~/assets/icons/ic_doublechevron_left.svg';
import IcDoublechevronRight from '~/assets/icons/ic_doublechevron_right.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { wrap } from 'popmotion';
// import IcRefresh from '~/assets/icons/navigations/ic-refresh.svg';

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
  const { setValue, watch } = useForm<MeasurePageFormValues>({
    defaultValues: {
      drinkType: '소주',
      drinks: [],
    },
    resolver: zodResolver(measurePageSchema),
  });
  const [drinkType, drinks] = watch(['drinkType', 'drinks']);

  const [visible, setVisible] = useState(0);
  const [back, setBack] = useState(false);
  //박스마다 이미지 적용
  const imageIndex = wrap(0, drinkTypes.length, visible);

  const nextPlease = () => {
    setBack(false);
    setVisible((prev) =>
      prev === drinkTypes.length - 1 ? drinkTypes.length - 1 : prev + 1
    );
  };
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const addDrink = () => setValue('drinks', [...drinks, drinkType]);
  const removeDrink = () => setValue('drinks', drinks.slice(0, -1));

  const color1 = '#F97C7280';
  const color2 = '#4C94FF80';

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
      <Box
        as="section"
        css={css`
          display: flex;
          flex-direction: column;
          position: relative;
          max-width: 700px;
          margin: 0 auto;
          height: 100%;

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
      >
        <Stack.Horizontal justify="space-between" align="center" padding="8px 16px">
          <IcBack onClick={() => router.push('/')} />
          <div>{/* <IcRefresh /> */}</div>
        </Stack.Horizontal>
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

        <Flex.Center width={200} margin="auto">
          <Flex.CenterHorizontal
            position="relative"
            width={200}
            height={40}
            as={motion.div}
          >
            <AnimatePresence custom={back}>
              <Stack.Horizontal
                align="center"
                as={motion.div}
                custom={back}
                variants={boxVariants}
                initial="entry"
                animate="center"
                exit="exit"
                key={visible}
                css={{
                  ...token.text.heading[1],
                }}
              >
                {drinkTypes[imageIndex]}
              </Stack.Horizontal>
            </AnimatePresence>
            <Flex
              position="absolute"
              left={0}
              right={0}
              top={0}
              bottom={0}
              justify="space-between"
            >
              <Box as={motion.button} height={40} width={40} onClick={prevPlease}>
                <IcDoublechevronLeft />
              </Box>
              <Box as={motion.button} height={40} width={40} onClick={nextPlease}>
                <IcDoublechevronRight />
              </Box>
            </Flex>
          </Flex.CenterHorizontal>
        </Flex.Center>

        <Box flex={1}>웹뷰</Box>

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
          <Button type="button" appearance="primary">
            다 입력했어요
          </Button>
        </Stack.Vertical>
      </Box>
    </Stack.Vertical>
  );
}

// animation
const boxVariants = {
  entry: (back: boolean) => ({
    x: back ? -100 : 100,
    opacity: 0,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
  exit: (back: boolean) => ({
    x: back ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.5 },
  }),
};
