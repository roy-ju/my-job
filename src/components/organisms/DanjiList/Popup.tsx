import React from 'react';

import { OverlayPresenter } from '@/components/molecules';

import DanjiList from '.';

type DanjiListPopupProps = {
  onClickClose: () => void;
  onSubmit?: (value: number) => void;
};

export default function DanjiListPopup({ onClickClose, onSubmit }: DanjiListPopupProps) {
  return (
    <OverlayPresenter>
      <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
        <DanjiList tw="h-full">
          <DanjiList.Header onClickClose={onClickClose} />
          <DanjiList.AddressSearchForm onSubmit={onSubmit} />
        </DanjiList>
      </div>
    </OverlayPresenter>
  );
}
