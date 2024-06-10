import { BuyOrRent, describeBuyOrRent as describeBuyOrRentUtil } from '@/constants/enums';

import { formatNumberInKorean } from '@/utils';

export const describeBuyOrRent = (mrf: number, bor: number) => {
  if (mrf > 0) return '월세';
  return describeBuyOrRentUtil(bor);
};

export const priceUtil = (pr: number, mrf?: number, bor?: number) => {
  if (bor === BuyOrRent.Buy) {
    return formatNumberInKorean(pr);
  }
  if (bor === BuyOrRent.Jeonsae) {
    if (typeof mrf === 'number' && mrf > 0) {
      return `${formatNumberInKorean(pr)}/${formatNumberInKorean(mrf)}`;
    }
    return formatNumberInKorean(pr);
  }

  if (bor === BuyOrRent.Wolsae && typeof mrf === 'number' && mrf >= 0) {
    return `${formatNumberInKorean(pr)}/${formatNumberInKorean(mrf)}`;
  }

  return '-';
};
