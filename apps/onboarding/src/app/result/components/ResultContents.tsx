'use client';

import styled from '@emotion/styled';
import { colors } from '@sulsul/token/src/colors';
import { text } from '@sulsul/token/src/text';
import { Button } from '@sulsul/ui';
import { DrinkRes } from '~/api';
import { AlcoholDetails } from '~/constants/alcohol';
import { ResultCard } from './ResultCard';
import { useSearchParams } from 'next/navigation';
import { getLevelDetails } from '../service';
import axios from 'axios';
import { keyframes } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { shareResult } from '~/app/utils/share';

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

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 64px 16px 40px;
`;

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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
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

const Drinks = styled.div<{ src: string }>`
  width: 40px;
  height: 40px;
  background: ${colors.grey[200]};
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
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
  const searchParams = useSearchParams();
  const drinkType = searchParams?.get('drinkType');
  const glasses = Number(searchParams?.get('glasses'));
  const { name, svg, description, mainColor } = getLevelDetails(glasses);
  const getDrinkingLimitShareQuery = useQuery(['result'], () => {
    return axios
      .get(
        `https://sulsul.app/api/v1/drinkingLimit/share?drinkType=${drinkType}&glass=${glasses}`
      )
      .then((response) => response.data);
  });

  const { color1, color2 } = getLevelDetails(glasses);

  return (
    <Background>
      <Section color1={color1} color2={color2}>
        <Wrapper>
          <PageLayout>
            <Heading2>당신은...</Heading2>
            <ResultCard
              name={name}
              svg={svg}
              description={description}
              mainColor={mainColor}
            />
            <Heading3>다른 술은 얼마나 마실 수 있을까?</Heading3>
            <DrinkLists>
              {getDrinkingLimitShareQuery.data?.otherDrinks.map((drinkRes: DrinkRes) => {
                const { drinkType, glass } = drinkRes;
                const { name, svg, volumn } =
                  AlcoholDetails[drinkType as keyof typeof AlcoholDetails];
                return (
                  <ListItem key={drinkType}>
                    <DrinkDetail>
                      <Drinks src={svg} />
                      <div>
                        <Heading5>{name}</Heading5>
                        <Volumn>{volumn}도</Volumn>
                      </div>
                    </DrinkDetail>
                    <Heading5>{glass}잔</Heading5>
                  </ListItem>
                );
              })}
            </DrinkLists>
            <ButtonWrapper>
              <Button type="button" onClick={shareResult} size="lg">
                내 주량 공유하기
              </Button>
              <Button type="button" appearance="primary" size="lg">
                술자리에서 측정하기
              </Button>
            </ButtonWrapper>
          </PageLayout>
        </Wrapper>
      </Section>
    </Background>
  );
};
