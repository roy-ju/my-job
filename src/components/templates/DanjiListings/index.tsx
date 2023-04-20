import { GetDanjiListingsResponse } from '@/apis/danji/danjiListingsList';
import { InfiniteScroll } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ListingItem } from '@/components/organisms';

export default function DanjiListings({
  data,
  onNext,
  handleBackButton,
}: {
  data?: GetDanjiListingsResponse['list'];
  onNext?: () => void;
  handleBackButton?: () => void;
}) {
  return (
    <div tw="flex flex-col relative h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleBackButton} />
        <NavigationHeader.Title>단지 매물 목록</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 px-5 [border-top: 1px solid #E9ECEF] overflow-auto">
        <InfiniteScroll tw="pt-1 flex-1 min-h-0 overflow-auto" onNext={onNext}>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <ListingItem.TypeOne
                key={item.listing_id}
                item={item}
                isLast={data.length - 1 === index}
                onClick={() => {}}
              />
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
