'use client';

import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

const Section = styled.section`
  background: linear-gradient(
    180deg,
    rgba(217, 217, 217, 0) 0%,
    rgba(0, 0, 0, 0) 0.01%,
    #000 100%
  );
`;

const Wrapper = styled.article`
  max-width: 700px;
  margin: 0 auto;
`;

const Layout = ({ children }: PropsWithChildren) => (
  <Section>
    <Wrapper>{children}</Wrapper>
  </Section>
);

export default Layout;
