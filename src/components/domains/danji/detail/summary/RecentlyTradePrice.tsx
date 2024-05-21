import { useMemo } from 'react';

import { formatNumberInKorean } from '@/utils';

import { formatDate } from '@/utils/fotmat';

import { CommonDanjiDetailProps } from '../types';

export default function RecentlyTradePrice({ danji }: CommonDanjiDetailProps) {
  const recentlyBuyPriceExist = useMemo(() => {
    const year = danji?.latest_buy_year;
    const month = danji?.latest_buy_month;
    const day = danji?.latest_buy_day;
    const price = danji?.latest_buy_price;

    if (!!year && !!month && !!day && !!price) {
      return {
        exist: true,
        price: formatNumberInKorean(price),
        day: formatDate({
          format: '.',
          sliceYear: true,
          year,
          month,
          day,
        }),
      };
    }
    return { exist: false, price: '', day: '' };
  }, [danji]);

  const recentlyJeonwolsaePrice = useMemo(() => {
    const year = danji?.latest_rent_year;
    const month = danji?.latest_rent_month;
    const day = danji?.latest_rent_day;
    const price = danji?.latest_rent_deposit;
    const monthlyRentFee = danji?.latest_rent_monthly_rent_fee;

    if (!!year && !!month && !!day && !!price) {
      const isExistWolase = !!monthlyRentFee;

      return {
        exist: true,
        price: isExistWolase
          ? `${formatNumberInKorean(price)}/${formatNumberInKorean(monthlyRentFee)}`
          : formatNumberInKorean(price),
        day: formatDate({
          format: '.',
          sliceYear: true,
          year,
          month,
          day,
        }),
      };
    }
    return { exist: false, price: '', day: '' };
  }, [danji]);

  return (
    <>
      {recentlyBuyPriceExist.exist && (
        <div tw="mt-1">
          <p tw="text-info text-gray-700">
            매매<span tw="text-gray-800 font-bold mx-1">{recentlyBuyPriceExist.price}</span>({recentlyBuyPriceExist.day}{' '}
            실거래)
          </p>
        </div>
      )}

      {recentlyJeonwolsaePrice.exist && (
        <div tw="mt-1">
          <p tw="text-info text-gray-700">
            전월세<span tw="text-gray-800 font-bold mx-1">{recentlyJeonwolsaePrice.price}</span>(
            {recentlyJeonwolsaePrice.day} 실거래)
          </p>
        </div>
      )}
    </>
  );
}
