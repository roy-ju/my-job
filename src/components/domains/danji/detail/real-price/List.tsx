import { memo } from 'react';

import { InfiniteScroll } from '@/components/atoms';

import { minDigits } from '@/utils/fotmat';

import { nanoid } from 'nanoid';

import { RealPricesListItem } from '@/services/danji/types';

import RealPriceListTableBody from './RealPriceListTableBody';

import { describeBuyOrRent, priceUtil } from './utils/priceAndBuyOrRent';

type ListProps = {
  realPricesList: RealPricesListItem[];
  isMorePage: boolean;
  onIntersect: () => void;
};

function List({ isMorePage, realPricesList, onIntersect }: ListProps) {
  return (
    <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={onIntersect}>
      {realPricesList && realPricesList.length > 0
        ? (isMorePage ? realPricesList : realPricesList.slice(0, 8)).map((item) => (
            <div
              key={nanoid()}
              tw="flex flex-row items-center [padding: 8px 0px 8px 0px] [border-bottom: 1px solid #F4F6FA]"
            >
              <RealPriceListTableBody
                title={`${(item.year && item.year.slice(2, 4)) || ''}.${minDigits(+item.month, 2)}.${minDigits(
                  +item.day,
                  2,
                )}`}
                isLeft
                width="4.375rem"
                isCancel={!!item.cancel_deal_day}
              />
              <RealPriceListTableBody
                title={describeBuyOrRent(item.monthly_rent_fee, item.buy_or_rent)}
                width="3.5rem"
                isSpecialColor
                buyOrRent={item.buy_or_rent}
                monthlyRentFee={item.monthly_rent_fee}
                isCancel={!!item.cancel_deal_day}
              />
              <RealPriceListTableBody
                title={`${item.floor}층` || '-'}
                width="3.5rem"
                isCancel={!!item.cancel_deal_day}
              />
              <RealPriceListTableBody
                isIcon={item.trade_type === '직거래'}
                title={priceUtil(item.price, item.monthly_rent_fee, item.buy_or_rent)}
                width="9.625rem"
                isCancel={!!item.cancel_deal_day}
                isLabel={!!item.cancel_deal_day}
              />
            </div>
          ))
        : null}
    </InfiniteScroll>
  );
}

export default memo(List);
