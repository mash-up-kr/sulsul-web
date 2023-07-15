'use client';

import { ThemeProvider } from '@emotion/react';
import { Flex, MediaQueryProvider } from '@jsxcss/emotion';
import { token } from '@sulsul/token';
import { SuspensiveConfigs, SuspensiveProvider } from '@suspensive/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RootStyleRegistry from '../../../emotion';
import '../globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const suspensiveConfigs = new SuspensiveConfigs({
  defaultOptions: {
    delay: { ms: 200 },
    suspense: {
      fallback: <Flex.Center>loading... Spinner</Flex.Center>,
    },
  },
});

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RootStyleRegistry>
      <MediaQueryProvider pxs={[0, 768, 1440]}>
        <SuspensiveProvider configs={suspensiveConfigs}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={token}>{children}</ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SuspensiveProvider>
      </MediaQueryProvider>
    </RootStyleRegistry>
  );
}
