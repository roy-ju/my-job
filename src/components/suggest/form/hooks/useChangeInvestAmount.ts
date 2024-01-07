import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { formatNumberInKorean } from '@/utils';

import SuggestForm from '../types';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import getPriceFormatFn from '../../utils/getPriceFormat';

export default function useChangeInvestAmount() {
  const [investAmount, setInvestAmount] = useRecoilState<SuggestForm['investAmount']>(
    SuggestFormSelector('investAmount'),
  );

  const purpose = useRecoilValue<SuggestForm['purpose']>(SuggestFormSelector('purpose'));

  const handleChangeInvestAmount = useCallback(
    (e?: NegocioChangeEvent<HTMLInputElement>) => {
      if (e) {
        const { value } = e.target;
        setInvestAmount(value);
      }
    },
    [setInvestAmount],
  );

  const handleResetInvestAmount = useCallback(() => {
    setInvestAmount('');
  }, [setInvestAmount]);

  console.log(investAmount);

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

  return {
    isRenderInvestAmountField,
    investAmount,
    investAmountLabel,
    handleChangeInvestAmount,
    handleResetInvestAmount,
  };
}
