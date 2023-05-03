import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { SuspensiveConfigs, SuspensiveProvider } from '@suspensive/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Flex, MediaQueryProvider } from '@jsxcss/emotion';
import { overridingTheme } from '~/styles/theme';

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

const App = ({ Component, pageProps }: AppProps) => (
  <MediaQueryProvider pxs={[0, 768, 1440]}>
    <SuspensiveProvider configs={suspensiveConfigs}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={overridingTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SuspensiveProvider>
  </MediaQueryProvider>
);

export default App;
