import { Dropdown, Tabs, NavigationHeader, NoDataUI } from '@/components/molecules';
import React, { useState } from 'react';
import { Loading, InfiniteScroll } from '@/components/atoms';
import { MyListItem } from '@/components/organisms';
import type { IMyListingListItem } from '@/components/organisms/MyListItem/Listing';
import type { IMyDanjiListItem } from '@/components/organisms/MyListItem/Danji';
import tw from 'twin.macro';

export interface MyFavoriteListProps {
  listingList: IMyListingListItem[];
  danjiList: IMyDanjiListItem[];
  isListingLoading: boolean;
  isDanjiLoading: boolean;
  listingFavoriteCount: number;
  danjiFavoriteCount: number;
  onToggleListingLike?: (listingId: number, isListingFavorite: boolean) => void;
  onToggleDanjiLike?: (danjiID: number, realestateType: number, isDanjiFavorite: boolean) => void;
  onListingNext?: () => void;
  onDanjiNext?: () => void;
  listingSortingType?: string;
  handleChangeListingSortingType?: (sortingType: string) => void;
  handleClickListingItem?: (listingId: number) => () => void;
  handleClickDanjiItem?: (danjiID: number, realestateType: number) => () => void;
}

export default function MyFavoriteList({
  listingList = [],
  danjiList = [],
  isDanjiLoading,
  isListingLoading,
  listingFavoriteCount,
  danjiFavoriteCount,
  onToggleListingLike,
  onToggleDanjiLike,
  onListingNext,
  onDanjiNext,
  listingSortingType,
  handleChangeListingSortingType,
  handleClickListingItem,
  handleClickDanjiItem,
}: MyFavoriteListProps) {
  const [activeTab, setActiveTab] = useState(0);

  const Divider = tw.div`border-b border-gray-300 mx-5`;
  const DanjiDivider = tw.div`border-b border-gray-300  my-5`;

  const renderDropdown = () => (
    <Dropdown
      size="small"
      tw="mt-5 ml-5 [width: 92px] "
      onChange={handleChangeListingSortingType}
      value={listingSortingType}
    >
      <Dropdown.Option tw="py-0.5 whitespace-pre text-info [width: 92px]" value="등록일순">
        등록일순
      </Dropdown.Option>
      <Dropdown.Option tw="py-0.5 whitespace-pre text-info [width: 92px]" value="조회순">
        조회순
      </Dropdown.Option>
      <Dropdown.Option tw="py-0.5 whitespace-pre text-info [width: 92px]" value="참여자순">
        참여자순
      </Dropdown.Option>
    </Dropdown>
  );

  const renderList = () => {
    let contents: JSX.Element;
    if (activeTab === 0 && listingList.length > 0) {
      contents = (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={onListingNext}>
          {renderDropdown()}
          <div>
            {listingList?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing
                  onClickListingItem={handleClickListingItem}
                  onToggleListingLike={onToggleListingLike}
                  {...item}
                />
              </React.Fragment>
            ))}
          </div>
        </InfiniteScroll>
      );
    } else if (activeTab === 1 && danjiList.length > 0) {
      contents = (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto " onNext={onDanjiNext}>
          <div tw="mx-5 my-7">
            {danjiList?.map((item, i) => (
              <React.Fragment key={item.danjiId}>
                {i > 0 && <DanjiDivider />}
                <MyListItem.Danji
                  onClickDanjiItem={handleClickDanjiItem}
                  onToggleDanjiLike={onToggleDanjiLike}
                  {...item}
                />
              </React.Fragment>
            ))}
          </div>
        </InfiniteScroll>
      );
    } else {
      contents = (
        <NoDataUI
          title={(() => {
            if (activeTab === 0) {
              return '관심 매물이 없습니다.';
            }
            return '관심 단지가 없습니다.';
          })()}
          body={
            <>
              네고시오에서 진행되고 있는 거래를 찾아
              <br />
              온라인으로 바로 네고를 시작해보세요
            </>
          }
        />
      );
    }
    return contents;
  };

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>관심 목록</NavigationHeader.Title>
      </NavigationHeader>
      {isDanjiLoading || isListingLoading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
