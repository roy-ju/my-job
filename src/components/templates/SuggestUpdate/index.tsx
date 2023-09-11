/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationHeader } from '@/components/molecules';
import React from 'react';
import { DanjiOrRegionalType } from '@/constants/enums';

interface Props {
  onClickBack?: () => void;
  danjiOrRegional?: number;
}

export default function SuggestUpdate({ onClickBack }: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>매물 구해요</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="pt-7 pb-10 px-5 flex items-center font-bold [letter-spacing: -0.25px]">
        구하는 매물의 조건을 등록하면
        <br />
        중개사에게 매물을 추천받을 수 있어요.
      </div>
    </div>
  );
}
