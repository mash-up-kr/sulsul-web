import Icon소주 from '~/assets/icons/ic-soju-m.svg';
import Icon맥주 from '~/assets/icons/ic-macju-m.svg';
import Icon와인 from '~/assets/icons/ic-wine-m.svg';
import Icon고량주 from '~/assets/icons/ic-goryanju-m.svg';
import Icon위스키 from '~/assets/icons/ic-whisky-m.svg';

import CardBaby from '~/assets/card/card-baby.svg';
import CardCommon from '~/assets/card/card-common.svg';
import CardMaster from '~/assets/card/card-master.svg';
import CardGhost from '~/assets/card/card-ghost.svg';
import CardHeaven from '~/assets/card/card-heaven.svg';
import CardGod from '~/assets/card/card-god.svg';
import { PostDrinkingLimitReqDrinkTypeEnum } from '~/api';

export const AlcoholDetails = {
  [PostDrinkingLimitReqDrinkTypeEnum.소주]: {
    name: PostDrinkingLimitReqDrinkTypeEnum.소주,
    SvgrIcon: Icon소주,
    volumn: 16.9,
  },
  [PostDrinkingLimitReqDrinkTypeEnum.맥주]: {
    name: PostDrinkingLimitReqDrinkTypeEnum.맥주,
    SvgrIcon: Icon맥주,
    volumn: 4.5,
  },
  [PostDrinkingLimitReqDrinkTypeEnum.와인]: {
    name: PostDrinkingLimitReqDrinkTypeEnum.와인,
    SvgrIcon: Icon와인,
    volumn: 13.5,
  },
  [PostDrinkingLimitReqDrinkTypeEnum.고량주]: {
    name: PostDrinkingLimitReqDrinkTypeEnum.고량주,
    SvgrIcon: Icon고량주,
    volumn: 40,
  },
  [PostDrinkingLimitReqDrinkTypeEnum.위스키]: {
    name: PostDrinkingLimitReqDrinkTypeEnum.위스키,
    SvgrIcon: Icon위스키,
    volumn: 50,
  },
} as const;

// 술 결과 목록
export const AlcoholResultType = {
  Baby: 'Baby',
  Common: 'Common',
  Master: 'Master',
  Ghost: 'Ghost',
  Heaven: 'Heaven',
  God: 'God',
} as const;

export type AlcoholResultType = typeof AlcoholResultType[keyof typeof AlcoholResultType];

export const AlcoholResultDetails = {
  [AlcoholResultType.Baby]: {
    name: '술요미',
    svg: <CardBaby />,
    image: '/metadata/images/baby.png',
    description: '귀엽네',
    mainColor: '#FF884533',
    color1: '#F97C7280',
    color2: '#4C94FF80',
  },
  [AlcoholResultType.Common]: {
    name: '술반인',
    svg: <CardCommon />,
    image: '/metadata/images/common.png',
    description: '가자~',
    mainColor: '#FFEDE333',
    color1: '#F97C7280',
    color2: '#4C94FF80',
  },
  [AlcoholResultType.Master]: {
    name: '이쯤되면 술잘알',
    svg: <CardMaster />,
    image: '/metadata/images/master.png',
    description: '술 좀 치네',
    mainColor: '#FFD02C33',
    color1: '#4C94FF80',
    color2: '#F97C7280',
  },
  [AlcoholResultType.Ghost]: {
    name: '알코올이 낳은 괴물',
    svg: <CardGhost />,
    image: '/metadata/images/monster.png',
    description: '미쳤다..',
    mainColor: '#FF2C2C33',
    color1: '#E05FFE80',
    color2: '#F97C7280',
  },
  [AlcoholResultType.Heaven]: {
    name: '음주가무 천상계',
    svg: <CardHeaven />,
    image: '/metadata/images/heaven.png',
    description: '알콜 마스터',
    mainColor: '#4C94FF80',
    color1: '#4C94FF80',
    color2: '#E05FFE80',
  },
  [AlcoholResultType.God]: {
    name: 'Alcohol God',
    svg: <CardGod />,
    image: '/metadata/images/god.png',
    description: '무서울 게 없다',
    mainColor: '#68D69780',
    color1: '#68D69780',
    color2: '#4C94FF80',
  },
};

export const drinkImage = {
  [PostDrinkingLimitReqDrinkTypeEnum.소주]: {
    image: '/images/bubble-soju.png',
    size: 80,
  },
  [PostDrinkingLimitReqDrinkTypeEnum.맥주]: {
    image: '/images/bubble-beer.png',
    size: 100,
  },
  [PostDrinkingLimitReqDrinkTypeEnum.와인]: {
    image: '/images/bubble-wine.png',
    size: 92,
  },
  [PostDrinkingLimitReqDrinkTypeEnum.고량주]: {
    image: '/images/bubble-goryanju.png',
    size: 68,
  },
  [PostDrinkingLimitReqDrinkTypeEnum.위스키]: {
    image: '/images/bubble-whisky.png',
    size: 68,
  },
} as const;
