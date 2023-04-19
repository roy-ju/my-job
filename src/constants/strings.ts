import { BuyOrRent, RealestateType, ListingStatus } from './enums';

export const RealestateTypeString: Record<number, string> = {
  [RealestateType.Apartment]: '아파트',
  [RealestateType.Officetel]: '오피스텔',
  [RealestateType.Dasaedae]: '아파트',
  [RealestateType.Yunrip]: '빌라',
  [RealestateType.Dandok]: '단독',
  [RealestateType.Dagagoo]: '다가구',
};

export const BuyOrRentString: Record<number, string> = {
  [BuyOrRent.Buy]: '매매',
  [BuyOrRent.Jeonsae]: '전세',
  [BuyOrRent.Wolsae]: '월세',
};

export const TargetPriceLabel: Record<number, string> = {
  [ListingStatus.Active]: '희망가',
  [ListingStatus.Complete]: '체결가',
  [ListingStatus.CompleteComplete]: '체결가',
};
