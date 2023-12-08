import React from 'react';
import { InfiniteScroll, Loading, Moment } from '@/components/atoms';
import { Tabs, Information, NavigationHeader, Dropdown } from '@/components/molecules';
import { MobGlobalNavigation, MyRealPriceListItem } from '@/components/organisms';
import ExclamationMark from '@/assets/icons/exclamation_mark.svg';
import { v4 } from 'uuid';

export interface IMyRealPriceListItem {
  danjiName: string;
  price: number;
  monthlyRentFee?: number;
  createdTime: string;
  area: string;
  buyOrRent: number;
  dealType: string;
  danjiID: number;
  realestateType: number;
}

export interface MyRealPriceListProps {
  updatedTime: string;
  list: IMyRealPriceListItem[];
  buyOrRent?: number;
  isLoading?: boolean;
  onNext?: () => void;
  onChangeBuyOrRent?: (newValue: number) => void;
  onClickBack?: () => void;
  onClickItem?: (danjiID: number, bor: number) => void;
  nickname?: string;
  sortBy?: string;
  unreadChatCount?: number;
  onChagneSortBy?: (value: string) => void;
}

export default function MobMyRealPriceList({
  updatedTime,
  isLoading,
  list,
  buyOrRent,
  onChangeBuyOrRent,
  onClickBack,
  onClickItem,
  onNext,
  nickname,
  sortBy,
  unreadChatCount,
  onChagneSortBy,
}: MyRealPriceListProps) {
  return (
    <div tw="w-full mx-auto h-full flex flex-col bg-white">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>관심 실거래가</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="px-5 pt-6 flex-1 flex flex-col min-h-0">
        <div tw="text-h2 font-bold mb-4">{nickname}님이 관심 가질 만한 실거래 정보</div>
        <div tw="text-info leading-none text-gray-700 mb-7">
          나의 관심 매물, 관심 단지 혹은 나의 주소지 주변 실거래 현황입니다.
        </div>

        <div tw="mb-4 text-info text-gray-700">
          최근 업데이트: {updatedTime ? <Moment format="YYYY.MM.DD">{updatedTime}</Moment> : '없음'}
        </div>
        <Tabs variant="contained" value={buyOrRent} onChange={onChangeBuyOrRent}>
          <Tabs.Tab value={0}>전체</Tabs.Tab>
          <Tabs.Tab value={1}>매매</Tabs.Tab>
          <Tabs.Tab value={2}>전월세</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs>
        <div tw="py-4 flex justify-end">
          <div tw="w-[110px]">
            <Dropdown size="small" value={sortBy} onChange={onChagneSortBy}>
              <Dropdown.Option tw="py-0.5 whitespace-pre text-info" value="업데이트 순">
                업데이트 순
              </Dropdown.Option>
              <Dropdown.Option tw="py-0.5 whitespace-pre text-info" value="거래일 순">
                거래일 순
              </Dropdown.Option>
            </Dropdown>
          </div>
        </div>

        {!isLoading && !updatedTime && (
          <div tw="my-24">
            <Information>
              <div tw="flex flex-col gap-4 items-center text-center">
                <ExclamationMark />
                <Information.Title>실거래 정보가 없습니다.</Information.Title>
              </div>
            </Information>
          </div>
        )}

        {!isLoading ? (
          <InfiniteScroll tw="flex-1 min-h-0 overflow-y-scroll -mx-5 pb-[5.25rem]" onNext={onNext}>
            {list &&
              list.length > 0 &&
              list.map((item) => (
                <MyRealPriceListItem
                  key={v4() + item.danjiName + item.area + item.price}
                  danjiName={item.danjiName}
                  price={item.price}
                  monthlyRentFee={item.monthlyRentFee}
                  createdTime={item.createdTime}
                  area={item.area}
                  buyOrRent={item.buyOrRent}
                  dealType={item.dealType}
                  onClick={() => onClickItem?.(item.danjiID, item.buyOrRent)}
                />
              ))}
          </InfiniteScroll>
        ) : (
          <div tw="py-20">
            <Loading />
          </div>
        )}
      </div>
      <div tw="w-full fixed bottom-0 left-auto right-auto">
        <MobGlobalNavigation index={4} unreadChatCount={unreadChatCount} />
      </div>
    </div>
  );
}
