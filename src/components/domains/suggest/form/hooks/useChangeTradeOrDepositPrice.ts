import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { formatNumberInKorean } from '@/utils';

import { regNumber } from '@/utils/regex';

import { BuyOrRent } from '@/constants/enums';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import maxAmount from '../constants/maxAmount';

import ERROR_MESSAGE from '../constants/errorMessage';

import isEqualValue from '../../utils/isEqualValue';

import getBuyOrRentPriceTitle from '../../utils/getBuyOrRentPriceTitle';

import getPriceFormatFn from '../../utils/getPriceFormat';

export default function useChangeTradeOrDepositPrice() {
  const [tradeOrDepositPrice, setTradeOrDepositPrice] = useRecoilState<SuggestForm['tradeOrDepositPrice']>(
    SuggestFormSelector('tradeOrDepositPrice'),
  );

  const [errorMessageTradeOrDepositPrice, setErrorMessageTradeOrDepositPrice] = useRecoilState<
    SuggestForm['errorMessageTradeOrDepositPrice']
  >(SuggestFormSelector('errorMessageTradeOrDepositPrice'));

  const forms = useRecoilValue<SuggestForm['forms']>(SuggestFormSelector('forms'));
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

        if (isEqualValue(numericValue, 0)) {
          setTradeOrDepositPrice('');

          if (forms.length > 2) {
            if (isEqualValue(buyOrRent, BuyOrRent.Buy)) {
              setErrorMessageTradeOrDepositPrice(ERROR_MESSAGE.REQUIRE_TRADE_PRICE);
            } else {
              setErrorMessageTradeOrDepositPrice(ERROR_MESSAGE.REQUIRE_DEPOSIT_PRICE);
            }
          }
        } else {
          setTradeOrDepositPrice(numericValue.toString());
        }
      }
    },
    [forms.length, buyOrRent, setErrorMessageTradeOrDepositPrice, setTradeOrDepositPrice],
  );

  const handleResetTradeOrDepositPrice = useCallback(() => {
    setTradeOrDepositPrice('');

    if (forms.length > 2) {
      if (isEqualValue(buyOrRent, BuyOrRent.Buy)) {
        setErrorMessageTradeOrDepositPrice(ERROR_MESSAGE.REQUIRE_TRADE_PRICE);
      } else {
        setErrorMessageTradeOrDepositPrice(ERROR_MESSAGE.REQUIRE_DEPOSIT_PRICE);
      }
    } else {
      setErrorMessageTradeOrDepositPrice('');
    }
  }, [setTradeOrDepositPrice, forms.length, buyOrRent, setErrorMessageTradeOrDepositPrice]);

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
