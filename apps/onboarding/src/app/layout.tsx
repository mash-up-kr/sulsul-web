'use client';

import './globals.css';
import { ThemeProvider } from '@emotion/react';
import { Flex, MediaQueryProvider } from '@jsxcss/emotion';
import { SuspensiveConfigs, SuspensiveProvider } from '@suspensive/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Inter } from 'next/font/google';
import { overridingTheme } from '~/styles/theme';

const inter = Inter({ subsets: ['latin'] });

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MediaQueryProvider pxs={[0, 768, 1440]}>
          <SuspensiveProvider configs={suspensiveConfigs}>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={overridingTheme}>{children}</ThemeProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </SuspensiveProvider>
        </MediaQueryProvider>
      </body>
    </html>
  );
}
