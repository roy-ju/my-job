import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { formatNumberInKorean } from '@/utils';

import { regNumber } from '@/utils/regex';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import maxAmount from '../constants/maxAmount';

import ERROR_MESSAGE from '../constants/errorMessage';

import isEqualValue from '../../utils/isEqualValue';

import getPriceFormatFn from '../../utils/getPriceFormat';

export default function useChangeInvestAmount() {
  const [investAmount, setInvestAmount] = useRecoilState<SuggestForm['investAmount']>(
    SuggestFormSelector('investAmount'),
  );

  const [errorMessageInvestAmountPrice, setErrorMessageInvestAmountPrice] = useRecoilState<
    SuggestForm['errorMessageInvestAmountPrice']
  >(SuggestFormSelector('errorMessageInvestAmountPrice'));

  const forms = useRecoilValue<SuggestForm['forms']>(SuggestFormSelector('forms'));
  const purpose = useRecoilValue<SuggestForm['purpose']>(SuggestFormSelector('purpose'));

  const handleChangeInvestAmount = useCallback(
    (e?: NegocioChangeEvent<HTMLInputElement>) => {
      if (e) {
        const input = e.target.value.replace(regNumber, '');

        let numericValue = input ? parseInt(input, 10) : 0;

        if (numericValue > maxAmount) {
          numericValue = maxAmount;

          setErrorMessageInvestAmountPrice(ERROR_MESSAGE.MAXIMUM_PRICE);
        } else {
          setErrorMessageInvestAmountPrice('');
        }

        if (isEqualValue(numericValue, 0)) {
          setInvestAmount('');

          if (forms.length > 3) {
            setErrorMessageInvestAmountPrice(ERROR_MESSAGE.REQUIRE_INVEST_AMOUNT);
          }
        } else {
          setInvestAmount(numericValue.toString());
        }
      }
    },
    [forms.length, setErrorMessageInvestAmountPrice, setInvestAmount],
  );

  const handleResetInvestAmount = useCallback(() => {
    setInvestAmount('');

    if (forms.length > 3) {
      setErrorMessageInvestAmountPrice(ERROR_MESSAGE.REQUIRE_INVEST_AMOUNT);
    } else {
      setErrorMessageInvestAmountPrice('');
    }
  }, [setInvestAmount, forms.length, setErrorMessageInvestAmountPrice]);

  const investAmountLabel = useMemo(
    () =>
      investAmount
        ? `투자금 ${formatNumberInKorean(Number(investAmount) * 10000, {
            formatFn: getPriceFormatFn,
          })}원`
        : '투자 예산',
    [investAmount],
  );

  const isRenderInvestAmountField = useMemo(() => isEqualValue(purpose, '투자'), [purpose]);

  const formattedPrice = useMemo(
    () => (investAmount ? parseInt(investAmount, 10).toLocaleString() : ''),
    [investAmount],
  );

  return {
    isRenderInvestAmountField,
    formattedPrice,
    investAmountLabel,
    errorMessageInvestAmountPrice,
    handleChangeInvestAmount,
    handleResetInvestAmount,
  };
}
