import { Dropdown, Tabs, NavigationHeader } from '@/components/molecules';
import React, { useState } from 'react';
import { InfiniteScroll } from '@/components/atoms';
import { MyListItem } from '@/components/organisms';
import type { IMyListingListItem } from '@/components/organisms/MyListItem/Listing';
import type { IMyDanjiListItem } from '@/components/organisms/MyListItem/Danji';
import tw from 'twin.macro';
import NoData from './Nodata';

export interface MyFavoriteListProps {
  listingList: IMyListingListItem[];
  danjiList: IMyDanjiListItem[];
  listingFavoriteCount: number;
  danjiFavoriteCount: number;
  onToggleListingLike?: (listingId: number, isListingFavorite: boolean) => void;
  onToggleDanjiLike?: (pnu: string, realestateType: number, isDanjiFavorite: boolean) => void;
  onListingNext?: () => void;
  onDanjiNext?: () => void;
}

export default function MyFavoriteList({
  listingList = [],
  danjiList = [],
  listingFavoriteCount,
  danjiFavoriteCount,
  onToggleListingLike,
  onToggleDanjiLike,
  onListingNext,
  onDanjiNext,
}: MyFavoriteListProps) {
  const [activeTab, setActiveTab] = useState(0);

  const Divider = tw.div`border-b border-gray-300 my-5`;

  const renderDropdown = () => (
    <Dropdown tw="mt-5 ml-5 w-28" size="medium" value="등록일순">
      <Dropdown.Option value="등록일순">등록일순</Dropdown.Option>
      <Dropdown.Option value="조회순">조회순</Dropdown.Option>
      <Dropdown.Option value="참여자순">참여자순</Dropdown.Option>
    </Dropdown>
  );

  const renderList = () => {
    let contents: JSX.Element;
    if (activeTab === 0 && danjiList?.length > 0) {
      contents = (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={onListingNext}>
          {renderDropdown()}
          <div tw="mx-5 my-4">
            {listingList?.map((item, i) => (
              <>
                {i > 0 && <Divider />}
                <MyListItem.Listing key={item.listingId} onToggleListingLike={onToggleListingLike} {...item} />
              </>
            ))}
          </div>
        </InfiniteScroll>
      );
    } else if (activeTab === 1 && danjiList.length > 0) {
      contents = (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto " onNext={onDanjiNext}>
          <div tw="mx-5 my-7">
            {danjiList?.map((item, i) => (
              <>
                {i > 0 && <Divider />}
                <MyListItem.Danji key={item.danjiId} onToggleDanjiLike={onToggleDanjiLike} {...item} />
              </>
            ))}
          </div>
        </InfiniteScroll>
      );
    } else {
      contents = (
        <div tw="flex-1 flex items-center justify-center">
          <NoData listType={activeTab === 0 ? '매물' : '단지'} />
        </div>
      );
    }
    return contents;
  };

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>관심 목록</NavigationHeader.Title>
      </NavigationHeader>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.Tab value={0}>
          매물 {listingFavoriteCount}
          {listingFavoriteCount > 99 && '+'}
        </Tabs.Tab>
        <Tabs.Tab value={1}>
          단지 {danjiFavoriteCount}
          {danjiFavoriteCount > 99 && '+'}
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs>

      {renderList()}
    </div>
  );
}
