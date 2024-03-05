import { Chip } from '@/components/atoms';

import { describeBuyOrRent } from '@/constants/enums';

import { IChatRoomDetailListingItem2 } from '@/services/chat/type';

import { RealestateTypeChipVariant, RealestateTypeString } from '@/constants/strings';

import { formatNumberInKorean } from '@/utils';

import useClientAccordionHandler from './hooks/useClientAccordionHandler';

type NegotiationItemCardProps = { item: IChatRoomDetailListingItem2; count: number };

export function NegotiationItemCard({ item }: Omit<NegotiationItemCardProps, 'count'>) {
  const { handleClickNavigateToListingDetail } = useClientAccordionHandler();

  return (
    <button
      type="button"
      tw="w-full [text-align: left] h-14 flex flex-row bg-white px-4 py-2 [border-radius: 8px] items-center hover:bg-gray-300 cursor-pointer"
      onClick={() => handleClickNavigateToListingDetail?.(item.listing_id, item.bidding_id)}
    >
      <div tw="min-w-[60px]">
        <Chip variant={RealestateTypeChipVariant[item.realestate_type]}>
          {RealestateTypeString[item.realestate_type]}
        </Chip>
      </div>

      <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-gray-800">
        <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-body_01">{item.listing_title}</div>
        <div tw="text-body_01">
          {describeBuyOrRent(item.buy_or_rent)}&nbsp;|&nbsp;
          {item.monthly_rent_fee
            ? `${formatNumberInKorean(item.trade_or_deposit_price)} / ${formatNumberInKorean(item.monthly_rent_fee)}`
            : `${formatNumberInKorean(item.trade_or_deposit_price)}`}
        </div>
      </div>
    </button>
  );
}

export function NegotiationItemCardHeader({ count }: Omit<NegotiationItemCardProps, 'item'>) {
  return (
    <div tw="flex flex-row items-center">
      <div tw="[border-radius: 50%] w-0.5 h-0.5 bg-gray-1000 mx-2" />
      가격 협상 중인 매물
      <div tw="ml-auto mr-0.5 text-subhead_01 text-nego">
        {count} <span tw="text-body_01 text-gray-800 ml-0.5">건</span>
      </div>
    </div>
  );
}
