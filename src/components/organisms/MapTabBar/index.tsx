import { Button } from '@/components/atoms';
import { ReactNode, useEffect, useState } from 'react';
import tw from 'twin.macro';
import FilterIcon from '@/assets/icons/filter.svg';
import ResetIcon from '@/assets/icons/reset.svg';

function MapTabBar({ children }: { children: ReactNode }) {
  return (
    <div tw="w-[23.75rem] h-[7.6rem] bg-white drop-shadow-md rounded-[0.5rem] flex flex-col">
      {children}
    </div>
  );
}

function BuildingTab({
  defaultTabIndex,
  onChange,
}: {
  defaultTabIndex?: number;
  onChange?: () => void;
}) {
  const TabIndex = {
    Apart: 0,
    villa: 1,
    oneRoom: 2,
  };

  const [selectedTab, setSelectedTab] = useState<number>(
    defaultTabIndex || TabIndex.Apart,
  );

  useEffect(() => {
    if (!onChange) return;
    onChange();
  }, [onChange, selectedTab]);

  return (
    <div tw="flex items-center px-2 border-b-[1px] border-gray-300">
      <Button
        theme="ghost"
        custom={tw`px-2`}
        onClick={() => setSelectedTab(TabIndex.Apart)}
      >
        <span
          tw="font-bold text-gray-600"
          css={[selectedTab === TabIndex.Apart && tw`text-gray-1000`]}
        >
          아파트 · 오피스텔
        </span>
      </Button>
      <div tw="w-[1px] h-2 bg-gray-300 mx-2" />
      <Button
        theme="ghost"
        custom={tw`px-2`}
        onClick={() => setSelectedTab(TabIndex.villa)}
      >
        <span
          tw="font-bold text-gray-600"
          css={[selectedTab === TabIndex.villa && tw`text-gray-1000`]}
        >
          빌라 · 주택
        </span>
      </Button>
      <div tw="w-[1px] h-2 bg-gray-300 mx-2" />
      <Button
        theme="ghost"
        custom={tw`px-2`}
        onClick={() => setSelectedTab(TabIndex.oneRoom)}
      >
        <span
          tw="font-bold text-gray-600"
          css={[selectedTab === TabIndex.oneRoom && tw`text-gray-1000`]}
        >
          원룸 · 투룸
        </span>
      </Button>
    </div>
  );
}

function FilterTab() {
  return (
    <div tw="w-full h-16 flex items-center justify-center gap-4">
      <div tw="flex items-center gap-2">
        <Button theme="outlined" size="small" custom={tw`p-2`}>
          <FilterIcon />
        </Button>
        <Button theme="outlined" size="small" custom={tw`text-b2`}>
          유형
        </Button>
        <Button theme="outlined" size="small" custom={tw`text-b2`}>
          매매
        </Button>
        <Button theme="outlined" size="small" custom={tw`text-b2`}>
          가격
        </Button>
        <Button theme="outlined" size="small" custom={tw`text-b2`}>
          세대수
        </Button>
        <Button theme="outlined" size="small" custom={tw`p-2`}>
          <ResetIcon />
        </Button>
      </div>
    </div>
  );
}

MapTabBar.BuildingTab = BuildingTab;
MapTabBar.FilterTab = FilterTab;

export default MapTabBar;
