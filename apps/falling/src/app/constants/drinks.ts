export const drinkImage = {
  소주: {
    image: '/images/bubble-soju.png',
    size: 80,
  },
  맥주: {
    image: '/images/bubble-beer.png',
    size: 100,
  },
  와인: {
    image: '/images/bubble-wine.png',
    size: 92,
  },
  고량주: {
    image: '/images/bubble-goryanju.png',
    size: 68,
  },
  위스키: {
    image: '/images/bubble-whisky.png',
    size: 68,
  },
} as const;

export type drinks = keyof typeof drinkImage;
