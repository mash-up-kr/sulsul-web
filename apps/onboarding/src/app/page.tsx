'use client';
import styled from '@emotion/styled';
import { token } from '@sulsul/token';
import { Button } from '@sulsul/ui';
import { useRouter } from 'next/navigation';
import MainImage from '../../public/icons/main.svg';
import { SVGWrapper } from './components/SVGWrapper';
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
  background: url('/icons/grainy.svg') repeat;
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="82"
          height="16"
          viewBox="0 0 82 16"
          fill="none"
          style={{ zIndex: 1 }}
        >
          <path
            d="M9.232 4.66665C9.09916 3.4301 8.09184 2.70967 6.46461 2.70967C4.78204 2.70967 3.84113 3.46235 3.83006 4.49461C3.81899 5.62364 5.0145 6.12901 6.39819 6.43009L7.83723 6.77417C10.5825 7.38707 12.6303 8.74191 12.6414 11.3333C12.6303 14.1828 10.35 16.0107 6.44247 16C2.56813 16.0107 0.0996259 14.2688 0 10.9247H3.23231C3.343 12.4946 4.62707 13.2903 6.39819 13.2903C8.14718 13.2903 9.27628 12.4946 9.27628 11.3333C9.27628 10.2688 8.28002 9.77416 6.53103 9.35481L4.78204 8.94621C2.08107 8.30105 0.420643 6.98923 0.420643 4.70966C0.409573 1.88171 2.97771 0 6.48675 0C10.0401 0 12.3757 1.91397 12.42 4.66665H9.232Z"
            fill="#FFBE5C"
          />
          <path
            d="M24.4055 0.215053H27.7485V10.3225C27.7485 13.7311 25.0807 16.0107 21.1068 16C17.1217 16.0107 14.4872 13.7311 14.4872 10.3225V0.215053H17.808V10.0645C17.8191 11.8602 19.1253 13.1505 21.1068 13.1612C23.1104 13.1505 24.4166 11.8602 24.4055 10.0645V0.215053Z"
            fill="#FFBE5C"
          />
          <path
            d="M30.1256 15.7849V0.215053H33.4465V13.1182H40.3539V15.7849H30.1256Z"
            fill="#FFBE5C"
          />
          <path
            d="M50.8781 4.66665C50.7453 3.4301 49.738 2.70967 48.1108 2.70967C46.4282 2.70967 45.4873 3.46235 45.4762 4.49461C45.4651 5.62364 46.6606 6.12901 48.0443 6.43009L49.4834 6.77417C52.2286 7.38707 54.2765 8.74191 54.2876 11.3333C54.2765 14.1828 51.9962 16.0107 48.0886 16C44.2143 16.0107 41.7458 14.2688 41.6461 10.9247H44.8784C44.9891 12.4946 46.2732 13.2903 48.0443 13.2903C49.7933 13.2903 50.9224 12.4946 50.9224 11.3333C50.9224 10.2688 49.9262 9.77416 48.1772 9.35481L46.4282 8.94621C43.7272 8.30105 42.0668 6.98923 42.0668 4.70966C42.0557 1.88171 44.6239 0 48.1329 0C51.6862 0 54.0219 1.91397 54.0662 4.66665H50.8781Z"
            fill="#FFBE5C"
          />
          <path
            d="M66.0516 0.215053H69.3946V10.3225C69.3946 13.7311 66.7269 16.0107 62.7529 16C58.7679 16.0107 56.1333 13.7311 56.1333 10.3225V0.215053H59.4542V10.0645C59.4653 11.8602 60.7715 13.1505 62.7529 13.1612C64.7565 13.1505 66.0627 11.8602 66.0516 10.0645V0.215053Z"
            fill="#FFBE5C"
          />
          <path
            d="M71.7717 15.7849V0.215053H75.0926V13.1182H82V15.7849H71.7717Z"
            fill="#FFBE5C"
          />
        </svg>
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
