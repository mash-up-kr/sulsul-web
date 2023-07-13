'use client';

import { ThemeProvider } from '@emotion/react';
import { Flex, MediaQueryProvider } from '@jsxcss/emotion';
import { token } from '@sulsul/token';
import { SuspensiveConfigs, SuspensiveProvider } from '@suspensive/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Inter } from 'next/font/google';
import './globals.css';
import RootStyleRegistry from '../../emotion';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

declare global {
  interface Window {
    Kakao: any;
  }
}

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
      <head>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js"
          integrity="sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh"
          crossOrigin="anonymous"
          defer
          onLoad={() => {
            const { Kakao } = window;

            if (Kakao && !Kakao.isInitialized()) {
              // SDK 초기화 부분, 본인의 API KEY 입력
              Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
            }
          }}
        />
      </head>
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
