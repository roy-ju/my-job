import { InfiniteScroll, Loading, Moment } from '@/components/atoms';
import { NavigationHeader, Tabs } from '@/components/molecules';
import { MyRealPriceListItem } from '@/components/organisms';

export interface IMyRealPriceListItem {
  danjiName: string;
  price: number;
  monthlyRentFee?: number;
  createdTime: string;
  area: string;
  buyOrRent: number;
  dealType: string;
}

export interface MyRealPriceListProps {
  updatedTime: string;
  list: IMyRealPriceListItem[];
  buyOrRent?: number;
  isLoading?: boolean;
  onNext?: () => void;
  onChangeBuyOrRent?: (newValue: number) => void;
}

export default function MyRealPriceList({
  updatedTime,
  isLoading,
  list,
  buyOrRent,
  onChangeBuyOrRent,
  onNext,
}: MyRealPriceListProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>관심 실거래가</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="px-5 pt-6 flex-1 flex flex-col min-h-0">
        <div tw="text-h2 font-bold mb-4">김네고님이 관심 가질 만한 실거래 정보</div>
        <div tw="text-info leading-none text-gray-700 mb-7">
          나의 관심 매물, 관심 단지 혹은 나의 주소지 주변 실거래 현황입니다.
        </div>
        {updatedTime && (
          <div tw="mb-4 text-info text-gray-700">
            최근 업데이트: <Moment format="YYYY.MM.DD">{updatedTime}</Moment>
          </div>
        )}
        <Tabs variant="contained" value={buyOrRent} onChange={onChangeBuyOrRent}>
          <Tabs.Tab value={0}>전체</Tabs.Tab>
          <Tabs.Tab value={1}>매매</Tabs.Tab>
          <Tabs.Tab value={2}>전월세</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs>
        {!isLoading ? (
          <InfiniteScroll tw="flex-1 min-h-0 overflow-y-scroll -mx-5" onNext={onNext}>
            {list.map((item) => (
              <MyRealPriceListItem
                key={item.danjiName + item.area + item.price}
                danjiName={item.danjiName}
                price={item.price}
                monthlyRentFee={item.monthlyRentFee}
                createdTime={item.createdTime}
                area={item.area}
                buyOrRent={item.buyOrRent}
                dealType={item.dealType}
              />
            ))}
          </InfiniteScroll>
        ) : (
          <div tw="py-20">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
