import { GetDanjiListingsResponse } from '@/apis/danji/danjiListingsList';
import { Button } from '@/components/atoms';
import ListingItem from '../ListingItem';

export default function ActiveListingInfo({
  danjiListings,
  onClick,
  handleListingAll,
}: {
  danjiListings?: GetDanjiListingsResponse['list'];
  onClick?: (id: number) => void;
  handleListingAll?: () => void;
}) {
  if (!danjiListings) return null;
  if (danjiListings && danjiListings.length === 0) return null;

  return (
    <div>
      <div tw="flex mb-2 px-5">
        <span tw="text-b1 [line-height: 1] font-bold">거래중인 매물&nbsp;</span>
        <span tw="text-b1 text-nego [line-height: 1] font-bold">{danjiListings.length}</span>
      </div>
      <ListingItem>
        {danjiListings.slice(0, 3).map((item, index) => (
          <ListingItem.TypeOne
            key={item.listing_id}
            item={item}
            isLast={danjiListings.length - 1 === index}
            onClick={onClick}
          />
        ))}
      </ListingItem>

      {danjiListings.length < 3 && (
        <div tw="flex flex-col gap-3 pt-3 px-5">
          <Button variant="outlined" size="medium" tw="w-full" onClick={handleListingAll}>
            매물 전체보기
          </Button>
        </div>
      )}
    </div>
  );
}
