import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';
import { Provider } from './constant/provider';
import { GlobalCSS } from '~/GlobalCSS';

const inter = Inter({ subsets: ['latin'] });

declare global {
  interface Window {
    Kakao: any;
  }
}

export const metadata: Metadata = {
  description: '당신의 주량은?',
  openGraph: {
    title: '술술',
    description: '당신의 주량은?',
    images:
      process.env.NODE_ENV === 'development'
        ? `/metadata/main_image.png`
        : `${process.env.NEXT_PUBLIC_DOMAIN}/metadata/main_image.png`,
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon/favicon-16x16.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <GlobalCSS />
        <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
          <Provider>{children}</Provider>
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  );
}
