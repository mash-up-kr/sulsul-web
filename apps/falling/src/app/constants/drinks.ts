export const drink_images = {
  소주: '/images/bubble-soju.png',
  맥주: '/images/bubble-beer.png',
  고량주: '/images/bubble-goryanju.png',
  위스키: '/images/bubble-whiskey.png',
  와인: '/images/bubble-wine.png',
} as const;

export type drinks = keyof typeof drink_images;
