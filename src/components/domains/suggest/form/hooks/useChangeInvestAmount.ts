import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { formatNumberInKorean } from '@/utils';

import { regNumber } from '@/utils/regex';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import maxAmount from '../constants/maxAmount';

import getPriceFormatFn from '../../utils/getPriceFormat';
import ERROR_MESSAGE from '../constants/errorMessage';

export default function useChangeInvestAmount() {
  const [investAmount, setInvestAmount] = useRecoilState<SuggestForm['investAmount']>(
    SuggestFormSelector('investAmount'),
  );

  const [errorMessageInvestAmountPrice, setErrorMessageInvestAmountPrice] = useRecoilState<
    SuggestForm['errorMessageInvestAmountPrice']
  >(SuggestFormSelector('errorMessageInvestAmountPrice'));

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

        if (numericValue === 0) {
          setInvestAmount('');
        } else {
          setInvestAmount(numericValue.toString());
        }
      }
    },
    [setErrorMessageInvestAmountPrice, setInvestAmount],
  );

  const handleResetInvestAmount = useCallback(() => {
    setInvestAmount('');
    setErrorMessageInvestAmountPrice('');
  }, [setInvestAmount, setErrorMessageInvestAmountPrice]);

  const investAmountLabel = useMemo(
    () =>
      investAmount
        ? `투자금 ${formatNumberInKorean(Number(investAmount) * 10000, {
            formatFn: getPriceFormatFn,
          })}원`
        : '투자 예산',
    [investAmount],
  );

  const isRenderInvestAmountField = useMemo(() => purpose === '투자', [purpose]);

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
