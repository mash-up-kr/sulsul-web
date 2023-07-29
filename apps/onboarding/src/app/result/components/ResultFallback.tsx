'use client';

import styled from '@emotion/styled';
import { colors } from '@sulsul/token/src/colors';
import { text } from '@sulsul/token/src/text';
import Image from 'next/image';
import LoadingImage from '~/assets/result_loading.gif';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100vh;
  background: url('/svgs/grainy.svg'), linear-gradient(180deg, #2e323a 0%, #1f2229 100%);
`;

const Title = styled.h1`
  margin-top: 20px;
  ${text.heading[2]};
  color: ${colors.grey[900]};
`;

const Description = styled.p`
  ${text.subtitle[1]};
  color: ${colors.grey[600]};
`;

export const ResultFallback = () => {
  return (
    <Container>
      <Image src={LoadingImage} alt="Calculating your limits" />
      <Title>오늘 마신 술을 계산하고 있어요</Title>
      <Description>잠시만 기다려 주세요.</Description>
    </Container>
  );
};
