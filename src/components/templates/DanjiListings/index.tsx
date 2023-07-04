import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { GetDanjiListingsResponse } from '@/apis/danji/danjiListingsList';
import { InfiniteScroll } from '@/components/atoms';
import { Dropdown, NavigationHeader } from '@/components/molecules';
import { DanjiDetailSection, ListingItem } from '@/components/organisms';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';

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
  const router = useRouter(depth);

  const handleClickListingDetail = (id: number, buyOrRent: number) => {
    router.push(Routes.ListingDetail, {
      persistParams: true,
      searchParams: { listingID: `${id}` },
      state: {
        bor: `${buyOrRent}`,
      },
    });
  };

  if (!danji) return null;

  return (
    <div tw="flex flex-col relative h-full">
      <NavigationHeader>
        {handleBackButton && <NavigationHeader.BackButton onClick={handleBackButton} />}
        <NavigationHeader.Title>단지 매물 목록</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="[min-height: 24px]" />
      <DanjiDetailSection>
        <DanjiDetailSection.Info danji={danji} depth={depth} isShowDanjiListings />
      </DanjiDetailSection>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="flex mb-2 px-5">
          <span tw="text-b1 [line-height: 1.5] font-bold">네고가능 매물&nbsp;</span>
          <span tw="text-b1 text-nego [line-height: 1.5] font-bold">{totalCount || 0}</span>

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
        <InfiniteScroll tw="pt-1 flex-1 min-h-0 overflow-auto" onNext={onNext}>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <ListingItem.TypeOne
                key={item.listing_id}
                item={item}
                isLast={data.length - 1 === index}
                onClick={() => {
                  handleClickListingDetail(item.listing_id, item.buy_or_rent);
                }}
                anchorURL={`/${Routes.DanjiListings}/${Routes.ListingDetail}?listingID=${item.listing_id}&p=${
                  danji?.pnu || ''
                }&rt=${danji?.type.toString() || ''}`}
              />
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
