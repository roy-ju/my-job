import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { BuyOrRent, DanjiOrRegionalType } from '@/constants/enums';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import isEqualValue from '../../utils/isEqualValue';

import isEnumValue from '../../utils/isEnumValue';

export default function useSelectBuyOrRent() {
  const [buyOrRent, setBuyOrRent] = useRecoilState<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));

  const forms = useRecoilValue<SuggestForm['forms']>(SuggestFormSelector('forms'));
  const danjiOrRegion = useRecoilValue<SuggestForm['danjiOrRegion']>(SuggestFormSelector('danjiOrRegion'));

  const setPopup = useSetRecoilState<SuggestForm['popup']>(SuggestFormSelector('popup'));

  const setUiBuyOrRent = useSetRecoilState<SuggestForm['uiBuyOrRent']>(SuggestFormSelector('uiBuyOrRent'));

  const setTradeOrDepositPrice = useSetRecoilState<SuggestForm['tradeOrDepositPrice']>(
    SuggestFormSelector('tradeOrDepositPrice'),
  );
  const setMonthlyRentFee = useSetRecoilState<SuggestForm['monthlyRentFee']>(SuggestFormSelector('monthlyRentFee'));
  const setNegotiable = useSetRecoilState<SuggestForm['negotiable']>(SuggestFormSelector('negotiable'));
  const setQuickSale = useSetRecoilState<SuggestForm['quickSale']>(SuggestFormSelector('quickSale'));

  const setErrorMessageTradeOrDepositPrice = useSetRecoilState<SuggestForm['errorMessageTradeOrDepositPrice']>(
    SuggestFormSelector('errorMessageTradeOrDepositPrice'),
  );
  const setErrorMessageMonthlyRentFeePrice = useSetRecoilState<SuggestForm['errorMessageMonthlyRentFeePrice']>(
    SuggestFormSelector('errorMessageMonthlyRentFeePrice'),
  );

  const handleClickBuyOrRent = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
      if (e) {
        const { value } = e.currentTarget;

        if (isEqualValue(Number(value), buyOrRent)) {
          return;
        }

        if (forms.length > 2) {
          setUiBuyOrRent(Number(value));
          setPopup('buyOrRent');
          return;
        }

        if (isEnumValue(Number(value), BuyOrRent)) {
          setBuyOrRent(Number(value));
          setTradeOrDepositPrice('');
          setMonthlyRentFee('');
          setNegotiable(false);
          setQuickSale('0');
          setErrorMessageTradeOrDepositPrice('');
          setErrorMessageMonthlyRentFeePrice('');
        }
      }
    },
    [
      buyOrRent,
      forms.length,
      setBuyOrRent,
      setErrorMessageMonthlyRentFeePrice,
      setErrorMessageTradeOrDepositPrice,
      setMonthlyRentFee,
      setNegotiable,
      setPopup,
      setQuickSale,
      setTradeOrDepositPrice,
      setUiBuyOrRent,
    ],
  );

  const isStyleChange = useMemo(() => isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji), [danjiOrRegion]);

  return { isStyleChange, buyOrRent, handleClickBuyOrRent };
}
