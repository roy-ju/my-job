import React from 'react';

import { Switch } from '@/components/atoms';

import useMySuggestDetailStore from './hooks/useMySuggestDetailStore';

import useSuggestChecked from './hooks/useSuggestChecked';

export default function ListHeader() {
  const value = useMySuggestDetailStore();

  const { suggestChecked, handleResumeSuggest, handleStopSuggest } = useSuggestChecked();

  const handleClick = () => {
    if (suggestChecked) {
      handleStopSuggest();
    } else {
      handleResumeSuggest();
    }
  };

  const count = value?.count ?? 0;

  return (
    <div tw="pt-10 px-5 flex justify-between items-center">
      <div tw="text-gray-1000 text-b1 font-bold self-start gap-1 flex items-center">
        <span>추천 현황</span>
        <span tw="text-nego-800">{count}</span>
      </div>
      <div tw="flex flex-col items-end gap-2">
        <Switch checked={suggestChecked} onClick={handleClick} />
        <span tw="text-gray-700 text-info">
          {suggestChecked ? '추천 요청 상태입니다.' : '추천 요정이 중단된 상태입니다.'}
        </span>
      </div>
    </div>
  );
}
