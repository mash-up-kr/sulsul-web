'use client';

import styled from '@emotion/styled';

export default function Home() {
  return <Button>onboarding</Button>;
}

const Button = styled.button`
  ${({ theme }) => theme.text.heading[2]}
  background-color: ${({ theme }) => theme.colors.primary[100]};
`;
