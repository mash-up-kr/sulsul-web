import { AlcoholResultDetails } from '../constant/alcohol';

export const getLevelDetails = (glasses: number) => {
  if (glasses <= 7) {
    return AlcoholResultDetails.Baby;
  }
  if (glasses <= 15) {
    return AlcoholResultDetails.Common;
  }
  if (glasses <= 23) {
    return AlcoholResultDetails.Master;
  }
  if (glasses <= 31) {
    return AlcoholResultDetails.Ghost;
  }
  if (glasses <= 39) {
    return AlcoholResultDetails.Heaven;
  }
  return AlcoholResultDetails.God;
};
