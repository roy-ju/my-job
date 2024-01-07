import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { formatNumberInKorean } from '@/utils';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import isEqualValue from '../../utils/isEqualValue';

import getBuyOrRentPriceTitle from '../../utils/getBuyOrRentPriceTitle';

import getPriceFormatFn from '../../utils/getPriceFormat';

export default function useChangeTradeOrDepositPrice() {
  const [tradeOrDepositPrice, setTradeOrDepositPrice] = useRecoilState<SuggestForm['tradeOrDepositPrice']>(
    SuggestFormSelector('tradeOrDepositPrice'),
  );

  const buyOrRent = useRecoilValue<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));

  const quickSale = useRecoilValue<SuggestForm['quickSale']>(SuggestFormSelector('quickSale'));

  const handleChangeTradeOrDepositPrice = useCallback(
    (e?: NegocioChangeEvent<HTMLInputElement>) => {
      if (e) {
        const { value } = e.target;
        setTradeOrDepositPrice(value);
      }
    },
    [setTradeOrDepositPrice],
  );

  const handleResetTradeOrDepositPrice = useCallback(() => {
    setTradeOrDepositPrice('');
  }, [setTradeOrDepositPrice]);

  const isRenderTradeOrDepositPrice = useMemo(
    () => !(!buyOrRent || isEqualValue(quickSale, '1')),
    [buyOrRent, quickSale],
  );

  const tradeOrDepositPriceLabel = useMemo(() => {
    if (!buyOrRent) {
      return '';
    }

    return tradeOrDepositPrice
      ? `${getBuyOrRentPriceTitle(buyOrRent)} ${formatNumberInKorean(Number(tradeOrDepositPrice) * 10000, {
          formatFn: getPriceFormatFn,
        })}원`
      : `${getBuyOrRentPriceTitle(buyOrRent)}`;
  }, [buyOrRent, tradeOrDepositPrice]);

  return {
    isRenderTradeOrDepositPrice,
    tradeOrDepositPrice,
    tradeOrDepositPriceLabel,
    handleChangeTradeOrDepositPrice,
    handleResetTradeOrDepositPrice,
  };
}
