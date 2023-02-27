import { Button } from '@/components/atoms/Button';
import { ReactNode } from 'react';

function MapTabBar({ children }: { children: ReactNode }) {
  return (
    <div tw="w-[23.75rem] h-[7.6rem] bg-white drop-shadow-md rounded-[0.5rem] flex flex-col">
      {children}
    </div>
  );
}

function BuildingTab() {
  return (
    <div tw="flex items-center px-2 border-b-[1px] border-gray-300">
      <Button theme="ghost" size="big">
        <span tw="font-bold">아파트 · 오피스텔</span>
      </Button>
      <div tw="w-[1px] h-2 bg-gray-300 mx-2" />
      <Button theme="ghost" size="big">
        <span tw="font-bold">빌라 · 주택</span>
      </Button>
      <div tw="w-[1px] h-2 bg-gray-300 mx-2" />
      <Button theme="ghost" size="big">
        <span tw="font-bold">원룸 · 투룸</span>
      </Button>
    </div>
  );
}

MapTabBar.BuildingTab = BuildingTab;

export default MapTabBar;
