import { BuyOrRent } from '@/constants/enums';

const getBuyOrRentPriceTitle = (buyOrRent: BuyOrRent | 0) => {
  if (buyOrRent === BuyOrRent.Buy) return '매매가';

  if (buyOrRent === BuyOrRent.Jeonsae) return '보증금';

  if (buyOrRent === BuyOrRent.Wolsae) return '월세';

  return '';
};

export default getBuyOrRentPriceTitle;
