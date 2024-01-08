import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { formatNumberInKorean } from '@/utils';

import { regNumber } from '@/utils/regex';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import maxAmount from '../constants/maxAmount';

import isEqualValue from '../../utils/isEqualValue';

import getBuyOrRentPriceTitle from '../../utils/getBuyOrRentPriceTitle';

import getPriceFormatFn from '../../utils/getPriceFormat';

import ERROR_MESSAGE from '../constants/errorMessage';

export default function useChangeTradeOrDepositPrice() {
  const [tradeOrDepositPrice, setTradeOrDepositPrice] = useRecoilState<SuggestForm['tradeOrDepositPrice']>(
    SuggestFormSelector('tradeOrDepositPrice'),
  );

  const [errorMessageTradeOrDepositPrice, setErrorMessageTradeOrDepositPrice] = useRecoilState<
    SuggestForm['errorMessageTradeOrDepositPrice']
  >(SuggestFormSelector('errorMessageTradeOrDepositPrice'));

  const buyOrRent = useRecoilValue<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));

  const quickSale = useRecoilValue<SuggestForm['quickSale']>(SuggestFormSelector('quickSale'));

  const handleChangeTradeOrDepositPrice = useCallback(
    (e?: NegocioChangeEvent<HTMLInputElement>) => {
      if (e) {
        const input = e.target.value.replace(regNumber, '');

        let numericValue = input ? parseInt(input, 10) : 0;

        if (numericValue > maxAmount) {
          numericValue = maxAmount;

          setErrorMessageTradeOrDepositPrice(ERROR_MESSAGE.MAXIMUM_PRICE);
        } else {
          setErrorMessageTradeOrDepositPrice('');
        }

        if (numericValue === 0) {
          setTradeOrDepositPrice('');
        } else {
          setTradeOrDepositPrice(numericValue.toString());
        }
      }
    },
    [setTradeOrDepositPrice, setErrorMessageTradeOrDepositPrice],
  );

  const handleResetTradeOrDepositPrice = useCallback(() => {
    setTradeOrDepositPrice('');
    setErrorMessageTradeOrDepositPrice('');
  }, [setTradeOrDepositPrice, setErrorMessageTradeOrDepositPrice]);

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

  const formattedPrice = useMemo(
    () => (tradeOrDepositPrice ? parseInt(tradeOrDepositPrice, 10).toLocaleString() : ''),
    [tradeOrDepositPrice],
  );

  return {
    isRenderTradeOrDepositPrice,
    formattedPrice,
    tradeOrDepositPriceLabel,
    errorMessageTradeOrDepositPrice,
    handleChangeTradeOrDepositPrice,
    handleResetTradeOrDepositPrice,
  };
}
