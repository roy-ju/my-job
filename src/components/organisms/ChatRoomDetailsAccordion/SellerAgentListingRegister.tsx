import { Button, Chip, Numeral } from '@/components/atoms';
import { BuyOrRentString } from '@/constants/strings';
import { useControlled } from '@/hooks/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import { BuyOrRent, ListingStatus } from '@/constants/enums';

import tw, { css } from 'twin.macro';
import ChatRoomDetailsAccordionContext from './ChatRoomDetailsAccordionContext';

interface Props {
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
  defaultExpanded?: boolean;
}

const listingDetailsStyles = css`
  & > div:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 4px;
    color: #e9ecef; // text-gray-300
  }
`;

export default function SellerBuyerSuggestRecommendation({
  expanded: expnadedProps,
  onChange,
  defaultExpanded = false,
}: Props) {
  const [expanded, setExpanded] = useControlled({ controlled: expnadedProps, default: defaultExpanded });
  const { listingItem, onClickNavigateToListingDetail, onClickNavigateToListingCreateResult } = useContext(
    ChatRoomDetailsAccordionContext,
  );

  const handleExpand = () => {
    setExpanded(true);
    onChange?.(true);
  };
  const handleClose = () => {
    setExpanded(false);
    onChange?.(false);
  };

  const isBeforeListingRegistration = listingItem && listingItem?.listing_status < ListingStatus.Active;

  const transactionType = listingItem ? BuyOrRentString[listingItem?.buy_or_rent] : '';
  const price =
    listingItem?.buy_or_rent === BuyOrRent.Wolsae ? (
      <span>
        <Numeral koreanNumber>{listingItem.trade_or_deposit_price}</Numeral>
        {' / '}
        <Numeral koreanNumber>{listingItem.monthly_rent_fee}</Numeral>
      </span>
    ) : (
      <Numeral koreanNumber>{listingItem?.trade_or_deposit_price}</Numeral>
    );
  const listingDetails = isBeforeListingRegistration ? (
    <div tw="text-gray-700">매물정보는 등록이 완료되면 노출됩니다.</div>
  ) : (
    <div tw="flex text-gray-700" css={listingDetailsStyles}>
      {listingItem?.jeonyong_area && <div>{`전용 ${Math.floor(+listingItem.jeonyong_area)}㎡`}</div>}
      {listingItem?.total_floor && listingItem?.floor_description && (
        <div>{`${listingItem.floor_description}/${listingItem.total_floor}층`}</div>
      )}
      {listingItem?.direction && <div>{listingItem.direction}</div>}
    </div>
  );

  return (
    <div tw="bg-white px-5 border-t border-b border-gray-300" css={expanded && tw`rounded-b-[20px]`}>
      <div tw="flex justify-between py-4">
        <div tw="flex items-center gap-1 line-clamp-1">
          <Chip variant="gray" tw="[vertical-align: text-bottom]">
            집주인 희망가
          </Chip>{' '}
          <span tw="text-b1">
            {transactionType} {price}
          </span>
        </div>
        {!expanded && (
          <button onClick={handleExpand} type="button" tw="shrink-0 mt-1 self-start underline text-info text-gray-1000">
            상세보기
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'just' }}
          >
            <div tw="text-b1 font-bold text-gray-1000">
              {transactionType} {price}
            </div>
            <div tw="text-info mb-4">
              <div>{listingItem?.listing_title}</div>
              {listingDetails}
            </div>

            <div tw="pb-5 flex gap-2">
              <Button tw="w-full h-9" variant="outlined" onClick={handleClose}>
                접어두기
              </Button>
              <Button
                tw="w-full mb-4 h-9"
                onClick={() => {
                  if (!listingItem) return;
                  if (isBeforeListingRegistration) onClickNavigateToListingCreateResult?.(listingItem.listing_id)?.();
                  else onClickNavigateToListingDetail?.(listingItem.listing_id)?.();
                }}
              >
                매물정보 보러가기
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
