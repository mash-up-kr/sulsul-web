import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Metadata } from 'next';
import Provider from './constant/provider';

const inter = Inter({ subsets: ['latin'] });

declare global {
  interface Window {
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: '술술',
  description: '당신의 주량은?',
  openGraph: {
    title: '술술',
    description: '당신의 주량은?',
    images: '../assets/images/main_image.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon/favicon-16x16.png" sizes="any" />
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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
