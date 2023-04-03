import React from 'react';
import { Moment, Numeral } from '@/components/atoms';
import { BuyOrRent } from '@/constants/enums';

export interface MyRealPriceListItemProps {
  danjiName: string;
  createdTime: string;
  price: number;
  monthlyRentFee?: number;
  area: string;
  buyOrRent: number;
  dealType: string;
}

export default function MyRealPriceListItem({
  danjiName,
  createdTime,
  price,
  monthlyRentFee,
  area,
  buyOrRent,
  dealType,
}: MyRealPriceListItemProps) {
  return (
    <div tw="bg-white">
      <button type="button" tw="text-start w-full flex flex-col items-stretch p-5">
        <div tw="flex items-center justify-between mb-2">
          <div tw="text-b2 leading-none">{danjiName}</div>
          <div tw="text-b2 leading-none text-nego-1000">
            <Numeral koreanNumber>{price}</Numeral>
            {Boolean(monthlyRentFee) && (
              <>
                {' '}
                / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
              </>
            )}
          </div>
        </div>
        <div tw="flex items-center gap-1.5 text-info leading-3.5 text-gray-700">
          <Moment format="YYYY.MM.DD">{createdTime}</Moment>
          <div tw="w-px h-2 bg-gray-300" />
          <span>전용 {area}㎡</span>
          <div tw="w-px h-2 bg-gray-300" />
          {dealType === '직거래' && (
            <span tw="w-4 h-4 rounded-[4px] bg-nego text-[10px] text-white leading-none flex items-center justify-center">
              직
            </span>
          )}
          <span>{buyOrRent === BuyOrRent.Buy ? '매매' : '전월세'}</span>
        </div>
      </button>
    </div>
  );
}
