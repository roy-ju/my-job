import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { BuyOrRent } from '@/constants/enums';

import { formatNumberInKorean } from '@/utils';

import { regNumber } from '@/utils/regex';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import maxAmount from '../constants/maxAmount';

import isEqualValue from '../../utils/isEqualValue';

import getBuyOrRentPriceTitle from '../../utils/getBuyOrRentPriceTitle';

import getPriceFormatFn from '../../utils/getPriceFormat';

import ERROR_MESSAGE from '../constants/errorMessage';

export default function useChangeMonthlyRentFee() {
  const [monthlyRentFee, setMonthlyRentFee] = useRecoilState<SuggestForm['monthlyRentFee']>(
    SuggestFormSelector('monthlyRentFee'),
  );

  const [errorMessageMonthlyRentFeePrice, setErrorMessageMonthlyRentFeePrice] = useRecoilState<
    SuggestForm['errorMessageMonthlyRentFeePrice']
  >(SuggestFormSelector('errorMessageMonthlyRentFeePrice'));

  const buyOrRent = useRecoilValue<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));

  const handleChangeMonthlyRentFee = useCallback(
    (e?: NegocioChangeEvent<HTMLInputElement>) => {
      if (e) {
        const input = e.target.value.replace(regNumber, '');

        let numericValue = input ? parseInt(input, 10) : 0;

        if (numericValue > maxAmount) {
          numericValue = maxAmount;

          setErrorMessageMonthlyRentFeePrice(ERROR_MESSAGE.MAXIMUM_PRICE);
        } else {
          setErrorMessageMonthlyRentFeePrice('');
        }

        if (numericValue === 0) {
          setMonthlyRentFee('');
        } else {
          setMonthlyRentFee(numericValue.toString());
        }
      }
    },
    [setMonthlyRentFee, setErrorMessageMonthlyRentFeePrice],
  );

  const handleResetMonthlyRentFee = useCallback(() => {
    setMonthlyRentFee('');
  }, [setMonthlyRentFee]);

  const isRenderMonthlyRentFeeField = useMemo(() => !!isEqualValue(buyOrRent, BuyOrRent.Jeonsae), [buyOrRent]);

  const monthlyRentFeeLabel = useMemo(() => {
    if (!buyOrRent) {
      return '';
    }

    return monthlyRentFee
      ? `${getBuyOrRentPriceTitle(BuyOrRent.Wolsae)} ${formatNumberInKorean(Number(monthlyRentFee) * 10000, {
          formatFn: getPriceFormatFn,
        })}원`
      : `${getBuyOrRentPriceTitle(BuyOrRent.Wolsae)}`;
  }, [buyOrRent, monthlyRentFee]);

  const formattedPrice = useMemo(
    () => (monthlyRentFee ? parseInt(monthlyRentFee, 10).toLocaleString() : ''),
    [monthlyRentFee],
  );

  return {
    isRenderMonthlyRentFeeField,
    formattedPrice,
    monthlyRentFeeLabel,
    errorMessageMonthlyRentFeePrice,
    handleChangeMonthlyRentFee,
    handleResetMonthlyRentFee,
  };
}
