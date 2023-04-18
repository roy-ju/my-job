import { useMemo } from 'react';
import Image from 'next/image';
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
        <div tw="flex gap-2 text-info text-gray-700">
          {area && <div>전용 {area}㎡</div>}
          {floorString && <div>{floorString}</div>}
          {direction && <div>{direction}</div>}
        </div>
      </div>
    </div>
  );
}
