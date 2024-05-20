import { useMemo } from 'react';

import Image from 'next/image';

import tw, { css } from 'twin.macro';

import Paths from '@/constants/paths';

export interface ListingSummaryCardProps {
  listingTitle: string;
  address: string;
  area: string;
  floorDescription: string;
  floor: string;
  direction: string;
  listingImagePath?: string;
}

const informationStringWrapper = css`
  ${tw`flex h-full text-gray-700 text-info`}
  & > div:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 0.25rem;
    color: #e9ecef; // text-gray-300
  }
`;

export default function ListingSummaryCard({
  listingTitle,
  address,
  area,
  floorDescription,
  floor,
  direction,
  listingImagePath,
}: ListingSummaryCardProps) {
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
    <div tw="flex gap-3 items-center">
      <Image
        src={listingImagePath ?? Paths.DEFAULT_APARTMENT_IMAGE_PATH}
        alt=""
        width={64}
        height={64}
        tw="rounded-lg"
      />
      <div tw="h-fit">
        <div tw="font-bold text-b1">{listingTitle}</div>
        <div tw="text-info">{address}</div>
        <div tw="flex gap-2 text-info text-gray-700" css={informationStringWrapper}>
          {area && <div>전용 {area}㎡</div>}
          {floorString && <div>{floorString}</div>}
          {direction && <div>{direction}</div>}
        </div>
      </div>
    </div>
  );
}
