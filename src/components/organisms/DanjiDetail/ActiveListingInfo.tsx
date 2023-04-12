import { GetDanjiListingsResponse } from '@/apis/danji/danjiListingsList';
import { Button } from '@/components/atoms';
import ListingItem from '../ListingItem';

export default function ActiveListingInfo({ danjiListings }: { danjiListings?: GetDanjiListingsResponse['list'] }) {
  if (!danjiListings) return null;
  if (danjiListings && danjiListings.length === 0) return null;

  return (
    <div tw="px-5">
      <div tw="flex">
        <span tw="text-b1 [line-height: 1] font-bold">거래중인 매물&nbsp;</span>
        <span tw="text-b1 text-nego [line-height: 1] font-bold">{danjiListings.length}</span>
      </div>
      <ListingItem>
        {danjiListings.map((item, index) => (
          <ListingItem.TypeOne key={item.listing_id} item={item} isLast={danjiListings.length - 1 === index} />
        ))}
      </ListingItem>

      {danjiListings.length >= 3 && (
        <div tw="flex flex-col gap-3 pt-3">
          <Button variant="outlined" size="medium" tw="w-full ">
            매물 전체보기
          </Button>
        </div>
      )}
    </div>
  );
}
