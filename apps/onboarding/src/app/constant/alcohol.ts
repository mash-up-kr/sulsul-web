// 술 목록
export const AlcoholType = {
  Soju: 'Soju',
  Beer: 'Beer',
  Wine: 'Wine',
  Wiskey: 'Wiskey',
  Liquor: 'Liquor', // 고량주
} as const;

export type AlcoholType = typeof AlcoholType[keyof typeof AlcoholType];

export const AlcoholDetails = {
  [AlcoholType.Soju]: {
    name: '소주',
    svg: '/icons/ic-soju-m.svg',
    volumn: 16.9,
  },
  [AlcoholType.Beer]: {
    name: '맥주',
    svg: '/icons/ic-macju-m.svg',
    volumn: 4.5,
  },
  [AlcoholType.Wine]: {
    name: '와인',
    svg: '/icons/ic-wine-m.svg',
    volumn: 13.5,
  },
  [AlcoholType.Liquor]: {
    name: '고량주',
    svg: '/icons/ic-goryanju-m.svg',
    volumn: 40,
  },
  [AlcoholType.Wiskey]: {
    name: '위스키',
    svg: '/icons/ic-wine-m.svg',
    volumn: 50,
  },
};
