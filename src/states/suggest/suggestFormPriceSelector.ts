import { selector } from 'recoil';

import { v1 } from 'uuid';

import getBuyOrRentPriceTitle from '@/components/suggest/utils/getBuyOrRentPriceTitle';
import getPriceFormatFn from '@/components/suggest/utils/getPriceFormat';
import makeObject from '@/components/suggest/utils/makeObject';
import { BuyOrRent } from '@/constants/enums';
import { formatNumberInKorean } from '@/utils';
import suggestFormState from './suggestFormState';

const suggestFormPriceSelector = selector({
  key: `suggestFromPriceSelector/${v1()}`,
  get: ({ get }) => {
    const { buyOrRent, price, monthlyRentFee } = get(suggestFormState);

    if (!buyOrRent) {
      return makeObject({
        tradeOrDepositPriceLabel: '',
        monthlyRentFeeLabel: '',
      });
    }

    if (buyOrRent === BuyOrRent.Buy) {
      return makeObject({
        tradeOrDepositPriceLabel: price
          ? `${getBuyOrRentPriceTitle(buyOrRent)} ${formatNumberInKorean(Number(price) * 10000, {
              formatFn: getPriceFormatFn,
            })}원`
          : `${getBuyOrRentPriceTitle(buyOrRent)}`,
        monthlyRentFeeLabel: '',
      });
    }

    return makeObject({
      tradeOrDepositPriceLabel: price
        ? `${getBuyOrRentPriceTitle(buyOrRent)} ${formatNumberInKorean(Number(price) * 10000, {
            formatFn: getPriceFormatFn,
          })}원`
        : `${getBuyOrRentPriceTitle(buyOrRent)}`,
      monthlyRentFeeLabel: monthlyRentFee
        ? `${getBuyOrRentPriceTitle(BuyOrRent.Wolsae)} ${formatNumberInKorean(Number(monthlyRentFee) * 10000, {
            formatFn: getPriceFormatFn,
          })}원`
        : `${getBuyOrRentPriceTitle(BuyOrRent.Wolsae)}`,
    });
  },
});

export default suggestFormPriceSelector;
