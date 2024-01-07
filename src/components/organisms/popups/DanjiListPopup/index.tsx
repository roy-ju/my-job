import React from 'react';

import { OverlayPresenter } from '@/components/molecules';

import { SearchDanjiResponseItem } from '@/apis/danji/searchDanji';

import DanjiList from '../../DanjiList';

type DanjiListPopupProps = {
  onClickClose: () => void;
  onSubmit?: (value: number) => void;
  onSubmitV2?: (value: SearchDanjiResponseItem) => void;
};

export default function DanjiListPopup({ onClickClose, onSubmit, onSubmitV2 }: DanjiListPopupProps) {
  return (
    <OverlayPresenter>
      <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
        <DanjiList tw="h-full">
          <DanjiList.Header onClickClose={onClickClose} />
          <DanjiList.AddressSearchForm onSubmit={onSubmit} onSubmitV2={onSubmitV2} />
        </DanjiList>
      </div>
    </OverlayPresenter>
  );
}
