import { DanjiListingsListItem } from '@/apis/danji/danjiListingsList';
import { Chip } from '@/components/atoms';
import { BuyOrRent, describeBuyOrRent } from '@/constants/enums';
import { formatNumberInKorean } from '@/utils';
import { cuttingDot } from '@/utils/fotmat';
import tw from 'twin.macro';
import View from '@/assets/icons/view.svg';
import Participants from '@/assets/icons/participants.svg';

export default function TypeOne({
  item,
  isLast = false,
  onClick,
}: {
  item?: DanjiListingsListItem;
  isLast?: boolean;
  onClick?: (id: number) => void;
}) {
  if (!item) return null;

  return (
    <div tw="hover:bg-gray-200 px-5">
      <button
        type="button"
        tw="flex flex-col py-5"
        css={[tw`w-full`, !isLast && tw`[border-bottom: 1px solid #E9ECEF]`]}
        onClick={() => onClick?.(item.listing_id)}
      >
        {item.is_participating && (
          <div tw="mb-2">
            <Chip
              css={[item.label_text === '협의중' ? tw`bg-nego-600` : tw`bg-green-1100`]}
              tw="text-white [border-top-left-radius: 4px ] [border-top-right-radius: 0px] [border-bottom-left-radius: 0px] [border-bottom-right-radius: 4px]"
            >
              {item.label_text}
            </Chip>
          </div>
        )}
        <div tw="flex items-center">
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
        </div>
        <div>
          <span tw="text-info">{item.listing_title}</span>
        </div>

        <div tw="w-full flex items-center justify-between">
          <div tw="flex items-center gap-1">
            <span tw="text-gray-700 text-info">전용 {cuttingDot(Number(item.jeonyong_area)) || '-'}㎡</span>
            <div tw="w-px h-2 bg-gray-300" />
            <span tw="text-gray-700 text-info">
              {item.floor_description.slice(0, 1) || '-'}/{item.total_floor}층
            </span>
            <div tw="w-px h-2 bg-gray-300" />
            <span tw="text-gray-700 text-info">{item.direction}</span>
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
