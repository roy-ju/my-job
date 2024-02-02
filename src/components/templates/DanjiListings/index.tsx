import Image from 'next/image';

import { useRouter } from 'next/router';

import { InfiniteScroll } from '@/components/atoms';

import { Dropdown, NavigationHeader } from '@/components/molecules';

import { DanjiDetailSection, ListingItem } from '@/components/organisms';

import Routes from '@/router/routes';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { GetDanjiListingsResponse } from '@/apis/danji/danjiListingsList';

import ListingNodata from '@/../public/static/images/listing_nodata.png';

export default function DanjiListings({
  depth,
  danji,
  data,
  totalCount,
  dropDownValue,
  onNext,
  handleBackButton,
  handleChangeDropDown,
}: {
  depth: number;
  danji?: GetDanjiDetailResponse;
  data?: GetDanjiListingsResponse['list'];
  totalCount: number;
  dropDownValue: string;
  onNext?: () => void;
  handleBackButton?: () => void;
  handleChangeDropDown: (value: string) => void;
}) {
  const router = useRouter();

  const handleClickListingDetail = (id: number, buyOrRent: number) => {
    const query = router.query;
    delete query.depth1;
    delete query.depth2;

    router.push({
      pathname: `/${Routes.DanjiListings}/${Routes.ListingDetail}`,
      query: { ...query, listingID: `${id}`, bor: `${buyOrRent}` },
    });
  };

  if (!danji) return null;

  return (
    <>
      <div tw="flex flex-col relative h-full">
        <NavigationHeader>
          {handleBackButton && <NavigationHeader.BackButton onClick={handleBackButton} />}
          <NavigationHeader.Title>단지 매물 목록</NavigationHeader.Title>
        </NavigationHeader>

        <div tw="[min-height: 24px]" />

        <DanjiDetailSection>
          <DanjiDetailSection.Info danji={danji} depth={depth} isShowDanjiListings />
        </DanjiDetailSection>

        {data && data.length > 0 && (
          <div tw="px-5">
            <div tw="flex items-center mb-1">
              <p tw="text-b1 font-bold mt-1">
                매물 <span tw="text-nego-1000">{totalCount || 0}</span>
              </p>
              <div tw="ml-auto">
                <Dropdown
                  size="small"
                  variant="outlined"
                  tw="[width: 92px] min-w-0 ml-auto"
                  value={dropDownValue}
                  onChange={(v) => {
                    handleChangeDropDown(v);
                  }}
                >
                  <Dropdown.Option tw="[width: 92px]" value="최신순">
                    최신순
                  </Dropdown.Option>
                  <Dropdown.Option tw="[width: 92px]" value="가격순">
                    가격순
                  </Dropdown.Option>
                </Dropdown>
              </div>
            </div>
            <p tw="text-info text-gray-700">매수인, 임차인의 가격 제안을 기다리고 있는 매물이에요.</p>
          </div>
        )}

        {data && data.length > 0 && (
          <div tw="flex-1 min-h-0 overflow-auto">
            <InfiniteScroll tw="pt-0 flex-1 min-h-0 overflow-auto" onNext={onNext}>
              {data.map((item, index) => (
                <ListingItem.TypeOne
                  key={item.listing_id}
                  item={item}
                  isFirst={index === 0}
                  isLast={data.length - 1 === index}
                  onClick={() => {
                    handleClickListingDetail(item.listing_id, item.buy_or_rent);
                  }}
                  anchorURL={`/${Routes.DanjiListings}/${Routes.ListingDetail}?listingID=${item.listing_id}&danjiID=${
                    danji?.danji_id || ''
                  }`}
                />
              ))}
            </InfiniteScroll>
          </div>
        )}

        {data && data.length === 0 && (
          <div tw="px-5 flex-1 min-h-0 overflow-auto flex flex-col items-center">
            <Image src={ListingNodata.src} width={200} height={128} alt="" />
            <p tw="mt-4 mb-2 text-center text-h2 font-bold">해당 단지에 등록된 매물이 없어요!</p>
            <p tw="text-center text-info text-gray-700">
              해당 단지에 매물을 가지고 있다면
              <br />
              우리집 등록 후 매물을 등록해보세요!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
