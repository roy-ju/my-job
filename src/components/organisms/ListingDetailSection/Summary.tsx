import EyeIcon from '@/assets/icons/eye.svg';
import UserIcon from '@/assets/icons/user.svg';
// import TooltipIcon from '@/assets/icons/tooltip.svg';
import MapPinIcon from '@/assets/icons/map_pin.svg';

import AptIcon from '@/assets/icons/apt.svg';
import RulerIcon from '@/assets/icons/ruler.svg';
import HeightIcon from '@/assets/icons/height.svg';
import DirectionIcon from '@/assets/icons/direction.svg';

import { Chip, Moment, Numeral } from '@/components/atoms';
import { BuyOrRentString, RealestateTypeString } from '@/constants/strings';
import { BuyOrRent } from '@/constants/enums';
import { useMemo } from 'react';

export interface SummaryProps {
  price?: number;
  monthlyRentFee?: number;
  buyOrRent?: number;
  createdTime?: string;
  viewCount?: number;
  participatorCount?: number;
  listingTitle?: string;
  address?: string;
  tags?: string[];
  realestateType?: number;
  jeonyongArea?: string;
  gonggeupArea?: string;
  floorDescription?: string;
  floor?: string;
  direction?: string;
  quickSale?: boolean;
  quickSaleComparative?: string;
}

export default function Summary({
  createdTime = '',
  viewCount = 0,
  participatorCount = 0,
  listingTitle = '',
  address = '',
  buyOrRent = 0,
  price = 0,
  monthlyRentFee = 0,
  realestateType = 0,
  jeonyongArea = '0',
  gonggeupArea = '0',
  direction = '',
  floorDescription,
  floor,
  tags,
  quickSale = false,
  quickSaleComparative = '',
}: SummaryProps) {
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
    <div>
      <div tw="flex text-b2 leading-5 text-gray-700 mb-2">
        <div tw="mr-auto">
          <p>
            등록일 <Moment format="yyyy.MM.DD">{createdTime}</Moment>
          </p>
        </div>
        <div tw="flex gap-3">
          <div tw="flex items-center gap-1">
            <EyeIcon tw="w-4 h-4" />
            <div>
              <p>조회수 {viewCount}</p>
            </div>
          </div>
          <div tw="flex items-center gap-1">
            <UserIcon tw="w-4 h-4" />
            <div>
              <p>참여수 {participatorCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div tw="text-b2 text-gray-700">
        <h1>{listingTitle}</h1>
      </div>
      <div tw="flex items-center gap-1 mb-2">
        <div tw="text-2xl font-bold [letter-spacing: -0.25px]">
          <h2>
            {BuyOrRentString[buyOrRent]}{' '}
            {buyOrRent === BuyOrRent.Wolsae ? (
              <span>
                <Numeral koreanNumber>{price}</Numeral> / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
              </span>
            ) : (
              <span>
                <Numeral koreanNumber>{price}</Numeral>
              </span>
            )}
          </h2>
        </div>
        {quickSale && <Chip variant="red">급매</Chip>}
        {/* <TooltipIcon /> */}
      </div>
      {quickSale && Boolean(quickSaleComparative) && (
        <div tw="text-b2">
          <p tw="[display: inline]">
            최근 실거래 대비 <span tw="text-blue-1000 [display: inline]">{quickSaleComparative}</span>
          </p>
        </div>
      )}

      <div tw="py-2 px-3 bg-gray-100 rounded-lg text-b2 leading-5 flex gap-2 items-center mt-4">
        <MapPinIcon tw="w-4 h-4 text-gray-600" />
        <h2>{address}</h2>
      </div>
      <div tw="h-[96px] flex">
        <div tw="flex-1 flex flex-col justify-center items-center gap-1 min-w-0">
          <AptIcon />
          <p tw="text-info leading-5">{RealestateTypeString[realestateType]}</p>
        </div>
        <div tw="flex-1 flex flex-col justify-center items-center gap-1 min-w-0">
          <RulerIcon />
          <p tw="text-info leading-5 w-full whitespace-nowrap overflow-hidden text-ellipsis text-center">
            {gonggeupArea}㎡/{jeonyongArea}㎡
          </p>
        </div>
        {floorString && (
          <div tw="flex-1 flex flex-col justify-center items-center gap-1 min-w-0">
            <HeightIcon />
            <p tw="text-info leading-5 w-full whitespace-nowrap overflow-hidden text-ellipsis text-center">
              {floorString}
            </p>
          </div>
        )}
        {direction && (
          <div tw="flex-1 flex flex-col justify-center items-center gap-1 min-w-0">
            <DirectionIcon />
            <p tw="text-info leading-5 w-full whitespace-nowrap overflow-hidden text-ellipsis text-center">
              {direction}
            </p>
          </div>
        )}
      </div>
      <div tw="flex items-center gap-2">
        {tags?.map((tag) => (
          <Chip variant="outlined" key={tag}>
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
}