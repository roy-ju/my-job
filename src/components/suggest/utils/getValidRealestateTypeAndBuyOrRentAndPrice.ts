import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';

import isEqualValue from './isEqualValue';

const getValidRealestateTypeAndBuyOrRentAndPrice = (
  danjiOrRegion: DanjiOrRegionalType | 0,
  buyOrRent: BuyOrRent | 0,
  price: string,
  realestateTypes: RealestateType[],
  quickSale: string,
) => {
  if (!danjiOrRegion) return true;

  if (!buyOrRent) return true;

  if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)) {
    if (isEqualValue(quickSale, '1')) {
      return false;
    }

    if (!price) {
      return true;
    }
  }

  if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Regional)) {
    if (!realestateTypes.length) {
      return true;
    }

    if (!price) {
      return true;
    }
  }

  return false;
};

export default getValidRealestateTypeAndBuyOrRentAndPrice;
