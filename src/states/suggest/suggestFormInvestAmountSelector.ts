import { selector } from 'recoil';

import { v1 } from 'uuid';

import formatNumberInKorean from '@/utils/formatNumberInKorean';

// import getPriceFormatFn from '@/components/templates/Suggest/utils/getPriceFormat';

import getPriceFormatFn from '@/components/suggest/utils/getPriceFormat';
import suggestFormState from './suggestFormState';

const suggestFormInvestAmountSelector = selector({
  key: `suggestFormInvestAmountSelector/${v1()}`,
  get: ({ get }) => {
    const { investAmount } = get(suggestFormState);

    if (!investAmount) {
      return '투자 예산';
    }

    return `투자금 ${formatNumberInKorean(Number(investAmount) * 10000, {
      formatFn: getPriceFormatFn,
    })}원`;
  },
});

export default suggestFormInvestAmountSelector;
