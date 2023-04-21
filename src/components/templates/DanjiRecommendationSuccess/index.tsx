import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import React from 'react';

export default function DanjiRecommendationSuccess({ handleCTA }: { handleCTA?: () => void }) {
  return (
    <div tw="relative h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>단지 매물 추천받기</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="pt-7 flex flex-col gap-1 flex-1 px-5">
        <span tw="text-b1 font-bold">중개사님들에게 단지 매물 추천을 요청했습니다.</span>
        <span tw="text-info text-gray-700 mb-1">중개사님들에게 단지 매물 추천을 요청했습니다.</span>
        <span tw="text-info text-gray-700">요청 내용 확인은 마이페이지에서 할 수 있습니다.</span>
      </div>
      <PersistentBottomBar>
        <Button onClick={handleCTA} tw="w-full" size="bigger">
          확인
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
