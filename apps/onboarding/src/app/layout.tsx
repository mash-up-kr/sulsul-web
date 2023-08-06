import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';
import { Provider } from '~/constants/provider';
import { GlobalCSS } from '~/GlobalCSS';
import { KakaoScript } from '~/KakaoScript';

const inter = Inter({ subsets: ['latin'] });

declare global {
  interface Window {
    Kakao: any;
    sulsulBridge: any;
  }
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_DOMAIN || 'https://onboarding.sulsul.app'
  ),
  title: '술술',
  description: '당신의 주량은?',
  openGraph: {
    title: '술술',
    description: '당신의 주량은?',
    images: `/metadata/main_image.png`,
  },
  manifest: '/favicons/site.webmanifest',
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
          <KakaoScript />
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  );
}
