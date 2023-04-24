import { BuyOrRent, RealestateType, ListingStatus, TimeType } from './enums';

export const RealestateTypeString: Record<number, string> = {
  [RealestateType.Apartment]: '아파트',
  [RealestateType.Officetel]: '오피스텔',
  [RealestateType.Dasaedae]: '빌라',
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

export const TimeTypeString: Record<number, string> = {
  [TimeType.AfterDay]: '이후',
  [TimeType.BeforeDay]: '이전',
  [TimeType.Day]: '당일',
};
