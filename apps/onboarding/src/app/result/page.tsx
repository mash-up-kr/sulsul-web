'use client';

import styled from '@emotion/styled';
import { colors } from '@sulsul/token/src/colors';
import { text } from '@sulsul/token/src/text';
import { Button } from '@sulsul/ui';
import { AlcoholDetails, AlcoholType } from '../constant/alcohol';
import { ResultCard } from './components/ResultCard';

const Page = styled.div`
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

const Result = () => (
  <Page>
    <Heading2>당신은...</Heading2>
    <ResultCard />
    <Heading3>다른 술은 얼마나 마실 수 있을까?</Heading3>
    <DrinkLists>
      {Object.values(AlcoholType).map((alcohol) => {
        const { name, svg, volumn } = AlcoholDetails[alcohol];
        return (
          <ListItem key={alcohol}>
            <DrinkDetail>
              <Drinks src={svg} />
              <div>
                <Heading5>{name}</Heading5>
                <Volumn>{volumn}도</Volumn>
              </div>
            </DrinkDetail>
            <Heading5>8잔</Heading5>
          </ListItem>
        );
      })}
    </DrinkLists>
    <ButtonWrapper>
      <Button type="button" css={{ width: '100%' }}>
        내 주량 공유하기
      </Button>
      <Button type="button" appearance="primary" css={{ width: '100%' }}>
        술자리에서 측정하기
      </Button>
    </ButtonWrapper>
  </Page>
);

export default Result;
