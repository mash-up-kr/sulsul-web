import type { AppProps } from 'next/app';
import { ThemeProvider, css } from '@emotion/react';
import { SuspensiveConfigs, SuspensiveProvider } from '@suspensive/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
      fallback: (
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          loading... Spinner
        </div>
      ),
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => (
  <SuspensiveProvider configs={suspensiveConfigs}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={overridingTheme}>
        <Component {...pageProps} />
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </SuspensiveProvider>
);

export default App;
