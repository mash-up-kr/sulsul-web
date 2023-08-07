'use client';
import styled from '@emotion/styled';
import { token } from '@sulsul/token';
import { Button } from '@sulsul/ui';
import { useRouter } from 'next/navigation';
import SulsulText from '~/assets/icons/sulsul-text.svg';
import MainImage from '~/assets/icons/main.svg';
import { SVGWrapper } from '../components/SVGWrapper';
import { shareResult } from './utils/share';

const Heading1 = styled.h1`
  ${token.text.heading[1]};
  color: ${token.colors.white};
  z-index: 1;
`;

const Description = styled.p`
  ${token.text.subtitle[2]};
  color: ${token.colors.grey['700']};
  z-index: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  z-index: 1;
`;

const GrainyOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/svgs/grainy.svg') repeat;
`;

export default function Home() {
  const router = useRouter();

  const moveNextPage = () => {
    router.push('/measure');
  };

  return (
    <div
      style={{
        position: 'relative',
        background: '#1f2229',
        padding: '100px 0 32px',
        textAlign: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          margin: 'auto',
          maxWidth: '700px',
        }}
      >
        {/* sulsul text */}
        <SulsulText />
        <Heading1>내 술 능력치는 얼만큼?</Heading1>
        <Description>내 주량, 어디까지 갈 수 있을까?</Description>
        <SVGWrapper
          style={{
            maxWidth: '540px',
            padding: '32px',
          }}
        >
          <MainImage />
          <GrainyOverlay />
        </SVGWrapper>
        <ButtonWrapper>
          <Button type="button" appearance="primary" size="lg" onClick={moveNextPage}>
            시작하기
          </Button>
          <Button type="button" size="lg" onClick={shareResult}>
            친구에게 공유하기
          </Button>
        </ButtonWrapper>
      </div>
    </div>
  );
}
