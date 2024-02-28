import tw from 'twin.macro';

import { Chip } from '@/components/atoms';

import { BuyOrRent, describeBuyOrRent } from '@/constants/enums';

import { formatNumberInKorean } from '@/utils';

import { DanjiListingListItem } from '@/services/danji/types';

import { cuttingDot } from '@/utils/fotmat';

import View from '@/assets/icons/view.svg';

import Participants from '@/assets/icons/participants.svg';

import ArrowRight from '@/assets/icons/arrow_right_16.svg';

export default function DanjiListingsCard({
  item,
  isFirst = false,
  isLast = false,
  onClick,
}: {
  item?: DanjiListingListItem;
  isFirst?: boolean;
  isLast?: boolean;
  onClick?: (id: number, buyOrRent: number) => void;
}) {
  if (!item) return null;

  return (
    <div tw="hover:bg-gray-200 px-5" css={[!isLast && tw`[border-bottom: 1px solid #E9ECEF]`]}>
      <button
        type="button"
        tw="flex flex-col py-7 relative"
        css={[tw`w-full`, isFirst && tw`pt-4`]}
        onClick={() => onClick?.(item.listing_id, item.buy_or_rent)}
      >
        {item.is_participating && (
          <div tw="flex items-center w-full mb-2">
            <Chip
              css={[item.label_text === '협의중' ? tw`bg-nego-600` : tw`bg-green-1100`]}
              tw="text-white [border-top-left-radius: 4px ] [border-top-right-radius: 0px] [border-bottom-left-radius: 0px] [border-bottom-right-radius: 4px]"
            >
              {item.label_text}
            </Chip>

            <p tw="flex items-center text-info whitespace-nowrap leading-4 ml-auto">
              상세보기
              <ArrowRight />
            </p>
          </div>
        )}

        <div tw="flex items-center w-full">
          {item.quick_sale && (
            <div tw="relative w-4 h-4 bg-red-700 [border-radius: 50%] mr-1">
              <span tw="absolute [top: 50%] [left: 50%] -translate-x-1/2 -translate-y-1/2 [font-size: 11px] [line-height: 1] font-bold text-b1  text-red-50">
                급
              </span>
            </div>
          )}
          <span tw="font-bold text-b1">{describeBuyOrRent(item.buy_or_rent)}&nbsp;</span>

          {item.buy_or_rent !== BuyOrRent.Wolsae ? (
            <span tw="font-bold text-b1">{formatNumberInKorean(item.trade_or_deposit_price)}</span>
          ) : (
            <>
              <span tw="font-bold text-b1">
                {formatNumberInKorean(item.trade_or_deposit_price)} / {formatNumberInKorean(item.monthly_rent_fee)}
              </span>
            </>
          )}

          {!item.is_participating && (
            <p tw="flex items-center text-info whitespace-nowrap leading-4 ml-auto">
              상세보기
              <ArrowRight />
            </p>
          )}
        </div>

        <div>
          <h1 tw="text-info">{item.listing_title}</h1>
        </div>

        <div tw="w-full flex items-center justify-between">
          <div tw="flex items-center gap-1">
            <p tw="text-gray-700 text-info">전용 {cuttingDot(Number(item.jeonyong_area)) || '-'}㎡</p>
            <div tw="w-px h-2 bg-gray-300" />
            <p tw="text-gray-700 text-info">
              {item.floor_description.slice(0, 1) || '-'}/{item.total_floor}층
            </p>
            <div tw="w-px h-2 bg-gray-300" />
            <p tw="text-gray-700 text-info">{item.direction}</p>
          </div>

          <div tw="flex items-center gap-3 ml-auto">
            <div tw="flex items-center gap-1">
              <View />
              <span tw="text-info text-gray-700">{item.view_count}</span>
            </div>
            <div tw="flex items-center gap-1">
              <Participants />
              <span tw="text-info text-gray-700">{item.participants_count}</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
