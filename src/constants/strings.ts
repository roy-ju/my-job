import { BuyOrRent, RealestateType } from './enums';

export const RealestateTypeString: Record<number, string> = {
  [RealestateType.Apartment]: '아파트',
  [RealestateType.Officetel]: '오피스텔',
  [RealestateType.Dasaedae]: '아파트',
  [RealestateType.Yunrip]: '빌라',
  [RealestateType.Dandok]: '단독',
  [RealestateType.Dagagoo]: '다가구',
  [RealestateType.OneRoom]: '원룸',
  [RealestateType.TwoRoom]: '투룸',
};

export const BuyOrRentString: Record<number, string> = {
  [BuyOrRent.Buy]: '매매',
  [BuyOrRent.Jeonsae]: '전세',
  [BuyOrRent.Wolsae]: '월세',
};
