import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { DanjiOrRegionalType, BuyOrRent } from '@/constants/enums';

import isEqualValue from '../../utils/isEqualValue';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

export default function useChangePriceTypeField() {
  const [quickSale, setQuickSale] = useRecoilState<SuggestForm['quickSale']>(SuggestFormSelector('quickSale'));

  const danjiOrRegion = useRecoilValue<SuggestForm['danjiOrRegion']>(SuggestFormSelector('danjiOrRegion'));
  const buyOrRent = useRecoilValue<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));

  const setTradeOrDepositPrice = useSetRecoilState<SuggestForm['tradeOrDepositPrice']>(
    SuggestFormSelector('tradeOrDepositPrice'),
  );
  const setMonthlyRentFee = useSetRecoilState<SuggestForm['monthlyRentFee']>(SuggestFormSelector('monthlyRentFee'));
  const setNegotiable = useSetRecoilState<SuggestForm['negotiable']>(SuggestFormSelector('negotiable'));

  const setErrorMessageTradeOrDepositPrice = useSetRecoilState<SuggestForm['errorMessageTradeOrDepositPrice']>(
    SuggestFormSelector('errorMessageTradeOrDepositPrice'),
  );
  const setErrorMessageMonthlyRentFeePrice = useSetRecoilState<SuggestForm['errorMessageMonthlyRentFeePrice']>(
    SuggestFormSelector('errorMessageMonthlyRentFeePrice'),
  );

  const handleChangeQuickSale = useCallback(
    (e?: NegocioChangeEvent<HTMLInputElement>) => {
      if (e) {
        const { value } = e.target;

        if (isEqualValue(value, '0')) {
          setQuickSale('0');
        }

        if (isEqualValue(value, '1')) {
          setQuickSale('1');
          setTradeOrDepositPrice('');
          setMonthlyRentFee('');
          setNegotiable(true);
          setErrorMessageTradeOrDepositPrice('');
          setErrorMessageMonthlyRentFeePrice('');
        }
      }
    },
    [
      setErrorMessageMonthlyRentFeePrice,
      setErrorMessageTradeOrDepositPrice,
      setMonthlyRentFee,
      setNegotiable,
      setQuickSale,
      setTradeOrDepositPrice,
    ],
  );

  const isRenderPriceTypeField = useMemo(() => {
    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji) && isEqualValue(buyOrRent, BuyOrRent.Buy)) {
      return true;
    }
    return false;
  }, [buyOrRent, danjiOrRegion]);

  return { isRenderPriceTypeField, quickSale, handleChangeQuickSale };
}
