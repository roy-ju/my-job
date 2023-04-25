import { NavigationHeader, Tabs } from '@/components/molecules';
import { useState } from 'react';
import ListingUpdate from './ListingUpdate';
import ListingDelete from './ListingDelete';

interface Props {
  onClickChat?: () => void;
  onClickDelete?: (reason: string) => void;
  onClickReport?: () => void;
}

export default function ListingManage({ onClickChat, onClickDelete, onClickReport }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>매물관리</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="py-7 px-5">
        <Tabs variant="contained" value={tabIndex} onChange={setTabIndex}>
          <Tabs.Tab value={0}>매물 수정</Tabs.Tab>
          <Tabs.Tab value={1}>매물등록 취소</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs>
      </div>
      {tabIndex === 0 && <ListingUpdate onClickChat={onClickChat} />}
      {tabIndex === 1 && <ListingDelete onClickDelete={onClickDelete} onClickReport={onClickReport} />}
    </div>
  );
}
