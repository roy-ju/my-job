import React, { useMemo } from 'react';
import Image from 'next/image';
import Paths from '@/constants/paths';
import { BuyOrRent } from '@/constants/enums';
import { Numeral } from '@/components/atoms';

interface ListingCardProps {
  listingId: number;
  buyOrRent: number;
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  listingTitle: string;
  jeonyongArea: string;
  thumbnailFullPath: string;
  floorDescription: string;
  totalFloor: string;
  direction: string;
}

export default function ListingCard({
  buyOrRent,
  direction,
  tradeOrDepositPrice,
  monthlyRentFee,
  listingTitle,
  jeonyongArea,
  floorDescription,
  totalFloor,
  thumbnailFullPath,
}: ListingCardProps) {
  const convertPrice = (price: number) => {
    const regex = /(\d{4})$/;
    return parseInt(price.toString().replace(regex, '0000'), 10);
  };

  const priceString = () => {
    const price = Number(convertPrice(tradeOrDepositPrice));
    if (buyOrRent === BuyOrRent.Buy) {
      return (
        <>
          매매{' '}
          <Numeral thousandsSeparated koreanNumber>
            {price}
          </Numeral>
        </>
      );
    }
    if (buyOrRent === BuyOrRent.Jeonsae) {
      return (
        <>
          전세{' '}
          <Numeral thousandsSeparated koreanNumber>
            {price}
          </Numeral>
        </>
      );
    }

    const rentPrice = Number(convertPrice(monthlyRentFee));

    return (
      <>
        월세{' '}
        <Numeral thousandsSeparated koreanNumber>
          {price}
        </Numeral>
        {' / '}
        <Numeral thousandsSeparated koreanNumber>
          {rentPrice}
        </Numeral>
      </>
    );
  };

  const floorString = useMemo(() => {
    const arr: string[] = [];
    if (floorDescription) {
      arr.push(floorDescription);
    }
    if (totalFloor) {
      arr.push(`${totalFloor}층`);
    }
    return arr.join('/');
  }, [floorDescription, totalFloor]);

  return (
    <button type="button" tw="flex text-left px-5 py-6 gap-3 items-center">
      <Image
        src={thumbnailFullPath ?? Paths.DEFAULT_APARTMENT_IMAGE_PATH}
        alt=""
        width={64}
        height={64}
        tw="rounded-lg"
      />
      <div tw="h-fit">
        <div tw="font-bold text-b1">{priceString()}</div>
        <div tw="text-info">{listingTitle}</div>
        <div tw="flex gap-2 text-info text-gray-700">
          {jeonyongArea && <div>전용 {jeonyongArea}㎡</div>}
          {floorString && <div>{floorString}</div>}
          {direction && <div>{direction}</div>}
        </div>
      </div>
    </button>
  );
}
