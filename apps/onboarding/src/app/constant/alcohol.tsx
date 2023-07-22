import CardBaby from '~/assets/card/card-baby.svg';
import CardCommon from '~/assets/card/card-common.svg';
import CardMaster from '~/assets/card/card-master.svg';
import CardGhost from '~/assets/card/card-ghost.svg';
import CardHeaven from '~/assets/card/card-heaven.svg';
import CardGod from '~/assets/card/card-god.svg';
import { DrinkResDrinkTypeEnum } from '~/api';

export const AlcoholDetails = {
  [DrinkResDrinkTypeEnum.소주]: {
    name: DrinkResDrinkTypeEnum.소주,
    svg: '/icons/ic-soju-m.svg',
    volumn: 16.9,
  },
  [DrinkResDrinkTypeEnum.맥주]: {
    name: DrinkResDrinkTypeEnum.맥주,
    svg: '/icons/ic-macju-m.svg',
    volumn: 4.5,
  },
  [DrinkResDrinkTypeEnum.와인]: {
    name: DrinkResDrinkTypeEnum.와인,
    svg: '/icons/ic-wine-m.svg',
    volumn: 13.5,
  },
  [DrinkResDrinkTypeEnum.고량주]: {
    name: DrinkResDrinkTypeEnum.고량주,
    svg: '/icons/ic-goryanju-m.svg',
    volumn: 40,
  },
  [DrinkResDrinkTypeEnum.위스키]: {
    name: DrinkResDrinkTypeEnum.위스키,
    svg: '/icons/ic-wine-m.svg',
    volumn: 50,
  },
};

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
