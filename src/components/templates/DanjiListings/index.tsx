import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { GetDanjiListingsResponse } from '@/apis/danji/danjiListingsList';
import { InfiniteScroll } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { DanjiDetailSection, ListingItem } from '@/components/organisms';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';

export default function DanjiListings({
  depth,
  danji,
  data,
  onNext,
  handleBackButton,
}: {
  depth: number;
  danji?: GetDanjiDetailResponse;
  data?: GetDanjiListingsResponse['list'];
  onNext?: () => void;
  handleBackButton?: () => void;
}) {
  const router = useRouter(1);

  const handleClickListingDetail = (id: number) => {
    router.replace(Routes.ListingDetail, { searchParams: { listingID: `${id}` } });
  };

  if (!danji) return null;

  return (
    <div tw="flex flex-col relative h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleBackButton} />
        <NavigationHeader.Title>단지 매물 목록</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="[min-height: 24px]" />
      <DanjiDetailSection>
        <DanjiDetailSection.Info danji={danji} depth={depth} />
      </DanjiDetailSection>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="flex mb-2 px-5">
          <span tw="text-b1 [line-height: 1.5] font-bold">네고가능 매물&nbsp;</span>
          <span tw="text-b1 text-nego [line-height: 1.5] font-bold">{data?.length || 0}</span>
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
                  router.popAll();
                  setTimeout(() => {
                    handleClickListingDetail(item.listing_id);
                  }, 200);
                }}
              />
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
