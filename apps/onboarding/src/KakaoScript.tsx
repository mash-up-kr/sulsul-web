'use client';

import Script from 'next/script';

export const KakaoScript = () => (
  <Script
    src="https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js"
    integrity="sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh"
    crossOrigin="anonymous"
    onLoad={() => {
      const { Kakao } = window;

      if (Kakao && !Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }}
  />
);
