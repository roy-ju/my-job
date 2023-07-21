import { useMemo } from 'react';
import Image from 'next/image';
import Paths from '@/constants/paths';
import tw, { css } from 'twin.macro';
import { Button } from '@/components/atoms';

export interface IListingDetailPassedItem {
  listingTitle: string;
  address: string;
  area: string;
  floorDescription: string;
  floor: string;
  direction: string;
  listingImagePath?: string;

  onClick?: () => void;
}

const informationStringWrapper = css`
  ${tw`flex h-full text-gray-700 text-info`}
  & > div:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 0.25rem;
    color: #e9ecef; // text-gray-300
  }
`;

export default function ListingDetailPassedItem({
  listingTitle,
  address,
  area,
  floorDescription,
  floor,
  direction,
  listingImagePath,
  onClick,
}: IListingDetailPassedItem) {
  const floorString = useMemo(() => {
    const arr: string[] = [];
    if (floorDescription) {
      arr.push(floorDescription);
    }
    if (floor) {
      arr.push(`${floor}층`);
    }
    return arr.join('/');
  }, [floorDescription, floor]);

  return (
    <div tw="flex w-full justify-between">
      <div tw="w-full flex gap-3 items-center">
        <Image
          src={listingImagePath || Paths.DEFAULT_APARTMENT_IMAGE_PATH}
          alt=""
          width={64}
          height={64}
          tw="rounded-lg"
        />
        <div tw="w-full overflow-hidden">
          <div tw="w-full flex  gap-3 justify-between">
            <div className="iphone-se-mobile-listingTitle" tw="font-bold text-b1 truncate">
              {listingTitle}
            </div>
            <Button onClick={onClick} variant="outlined" tw="h-8 shrink-0">
              매물 상세
            </Button>
          </div>
          <div tw="text-info text-left truncate">{address}</div>
          <div css={informationStringWrapper}>
            {area && <div tw="whitespace-nowrap">전용 {area}㎡</div>}
            {floorString && <div tw="whitespace-nowrap">{floorString}</div>}
            {direction && <div tw="whitespace-nowrap">{direction}</div>}
          </div>
        </div>
      </div>
      {/* <Button onClick={onClick} variant="outlined" tw="h-8 px-4 shrink-0">
        매물 상세
      </Button> */}
    </div>
  );
}