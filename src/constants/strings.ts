import { BuyOrRent, RealestateType, TimeType } from './enums';
import Paths from './paths';

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

// 정책 삭제
// export const TargetPriceLabel: Record<number, string> = {
//   [ListingStatus.Active]: '희망가',
//   [ListingStatus.ContractComplete]: '체결가',
//   [ListingStatus.PreContractComplete]: '체결가',
// };

export const TimeTypeString: Record<number, string> = {
  [TimeType.AfterDay]: '이후',
  [TimeType.BeforeDay]: '이전',
  [TimeType.Day]: '당일',
};

export const DefaultListingImage: Record<number, string> = {
  [RealestateType.Apartment]: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
  [RealestateType.Officetel]: Paths.DEFAULT_OFFICETEL_IMAGE_PATH,
  [RealestateType.Dasaedae]: Paths.DEFAULT_DASAEDAE_IMAGE_PATH,
  [RealestateType.Yunrip]: Paths.DEFAULT_DASAEDAE_IMAGE_PATH,
  [RealestateType.Dandok]: Paths.DEFAULT_DANDOK_IMAGE_PATH,
  [RealestateType.Dagagoo]: Paths.DEFAULT_DANDOK_IMAGE_PATH,
};

export const DefaultListingImageLg: Record<number, string> = {
  [RealestateType.Apartment]: Paths.DEFAULT_APARTMENT_IMAGE_LG_PATH,
  [RealestateType.Officetel]: Paths.DEFAULT_APARTMENT_IMAGE_LG_PATH,
  [RealestateType.Dasaedae]: Paths.DEFAULT_APARTMENT_IMAGE_LG_PATH,
  [RealestateType.Yunrip]: Paths.DEFAULT_APARTMENT_IMAGE_LG_PATH,
  [RealestateType.Dandok]: Paths.DEFAULT_APARTMENT_IMAGE_LG_PATH,
  [RealestateType.Dagagoo]: Paths.DEFAULT_APARTMENT_IMAGE_LG_PATH,
};

export const RealestateTypeChipVariant: Record<number, 'nego' | 'green' | 'red' | 'blue' | 'orange'> = {
  [RealestateType.Apartment]: 'nego',
  [RealestateType.Officetel]: 'green',
  [RealestateType.Dandok]: 'red',
  [RealestateType.Dagagoo]: 'blue',
  [RealestateType.Yunrip]: 'orange',
  [RealestateType.Dasaedae]: 'orange',
};
