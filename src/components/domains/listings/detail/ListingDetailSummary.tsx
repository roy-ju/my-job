import { useMemo } from 'react';

import { styled } from 'twin.macro';

import { Chip, Moment, Numeral } from '@/components/atoms';

import { BuyOrRentString, RealestateTypeString } from '@/constants/strings';

import { BuyOrRent } from '@/constants/enums';

import { ListingDetailResponse } from '@/services/listing/types';

import EyeIcon from '@/assets/icons/eye.svg';

import UserIcon from '@/assets/icons/user.svg';

import MapPinIcon from '@/assets/icons/map_pin.svg';

import AptIcon from '@/assets/icons/apt.svg';

import RulerIcon from '@/assets/icons/ruler.svg';

import HeightIcon from '@/assets/icons/height.svg';

import DirectionIcon from '@/assets/icons/direction.svg';

const SectionContainer = styled.div``;

export interface ListingDetailSummaryProps {
  listingDetail?: ListingDetailResponse | null;
}

export default function ListingDetailSummary({ listingDetail }: ListingDetailSummaryProps) {
  const createdTime = listingDetail?.active_status_time;
  const viewCount = listingDetail?.listing?.view_count;
  const participatorCount = listingDetail?.participator_count;
  const listingTitle = listingDetail?.listing?.listing_title;
  const address = listingDetail?.display_address;
  const buyOrRent = listingDetail?.listing?.buy_or_rent ?? 0;
  const price = listingDetail?.trade_or_deposit_price;
  const monthlyRentFee = listingDetail?.monthly_rent_fee;
  const realestateType = listingDetail?.listing?.realestate_type ?? 0;
  const jeonyongArea = listingDetail?.listing?.jeonyong_area;
  const gonggeupArea = listingDetail?.listing?.gonggeup_area;
  const floor = listingDetail?.listing?.total_floor;
  const floorDescription = listingDetail?.listing?.floor_description;
  const direction = listingDetail?.listing?.direction;
  const tags = listingDetail?.tags?.map((tag) => tag.name);
  const quickSale = listingDetail?.listing?.quick_sale;
  const quickSaleComparative = listingDetail?.listing?.quick_sale_comparative;

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
    <SectionContainer tw="px-5 py-6">
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
    </SectionContainer>
  );
}
