import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { BuyOrRent, DanjiOrRegionalType } from '@/constants/enums';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import isEqualValue from '../../utils/isEqualValue';

import isEnumValue from '../../utils/isEnumValue';

export default function useSelectBuyOrRent() {
  const [buyOrRent, setBuyOrRent] = useRecoilState<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));

  const danjiOrRegion = useRecoilValue<SuggestForm['danjiOrRegion']>(SuggestFormSelector('danjiOrRegion'));

  const setTradeOrDepositPrice = useSetRecoilState<SuggestForm['tradeOrDepositPrice']>(
    SuggestFormSelector('tradeOrDepositPrice'),
  );
  const setMonthlyRentFee = useSetRecoilState<SuggestForm['monthlyRentFee']>(SuggestFormSelector('monthlyRentFee'));
  const setNegotiable = useSetRecoilState<SuggestForm['negotiable']>(SuggestFormSelector('negotiable'));
  const setQuickSale = useSetRecoilState<SuggestForm['quickSale']>(SuggestFormSelector('quickSale'));

  const handleClickBuyOrRent = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
      if (e) {
        const { value } = e.currentTarget;

        if (isEqualValue(Number(value), buyOrRent)) {
          return;
        }

        if (isEnumValue(Number(value), BuyOrRent)) {
          setBuyOrRent(Number(value));
          setTradeOrDepositPrice('');
          setMonthlyRentFee('');
          setNegotiable(true);
          setQuickSale('0');
        }
      }
    },
    [buyOrRent, setBuyOrRent, setMonthlyRentFee, setNegotiable, setQuickSale, setTradeOrDepositPrice],
  );

  const isStyleChange = useMemo(() => isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji), [danjiOrRegion]);

  return { isStyleChange, buyOrRent, handleClickBuyOrRent };
}
