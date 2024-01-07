import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { BuyOrRent } from '@/constants/enums';

import { formatNumberInKorean } from '@/utils';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import isEqualValue from '../../utils/isEqualValue';

import getBuyOrRentPriceTitle from '../../utils/getBuyOrRentPriceTitle';

import getPriceFormatFn from '../../utils/getPriceFormat';

export default function useChangeMonthlyRentFee() {
  const [monthlyRentFee, setMonthlyRentFee] = useRecoilState<SuggestForm['monthlyRentFee']>(
    SuggestFormSelector('monthlyRentFee'),
  );

  const buyOrRent = useRecoilValue<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));

  const handleChangeMonthlyRentFee = useCallback(
    (e?: NegocioChangeEvent<HTMLInputElement>) => {
      if (e) {
        const { value } = e.target;
        setMonthlyRentFee(value);
      }
    },
    [setMonthlyRentFee],
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

  return {
    isRenderMonthlyRentFeeField,
    monthlyRentFee,
    monthlyRentFeeLabel,
    handleChangeMonthlyRentFee,
    handleResetMonthlyRentFee,
  };
}
