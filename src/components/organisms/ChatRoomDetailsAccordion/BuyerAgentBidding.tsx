import { Button, Chip, Numeral } from '@/components/atoms';
import { useControlled } from '@/hooks/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';

import tw, { css } from 'twin.macro';
import { BuyOrRentString } from '@/constants/strings';
import { BuyOrRent } from '@/constants/enums';
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

export default function BuyerAgentBidding({ expanded: expnadedProps, onChange, defaultExpanded = false }: Props) {
  const [expanded, setExpanded] = useControlled({ controlled: expnadedProps, default: defaultExpanded });
  const { biddingItem, listingItem, onClickNavigateToListingDetailHistory } = useContext(
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
  const listingDetails = (
    <div tw="flex text-gray-700 text-info mb-4" css={listingDetailsStyles}>
      {listingItem?.jeonyong_area && <div>{`전용 ${Math.floor(+listingItem.jeonyong_area)}㎡`}</div>}
      {listingItem?.total_floor && listingItem?.floor_description && (
        <div>{`${listingItem.floor_description}/${listingItem.total_floor}층`}</div>
      )}
      {listingItem?.direction && <div>{listingItem.direction}</div>}
    </div>
  );

  const biddingPrice = biddingItem?.bidding_monthly_rent_fee ? (
    <span>
      <Numeral koreanNumber>{listingItem?.trade_or_deposit_price}</Numeral>
      {' / '}
      <Numeral koreanNumber>{listingItem?.monthly_rent_fee}</Numeral>
    </span>
  ) : (
    <Numeral koreanNumber>{listingItem?.trade_or_deposit_price}</Numeral>
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
      {/* details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'just' }}
          >
            {listingDetails}
            <div tw="border-t border-gray-300 pb-5">
              <div tw="text-info mt-2 mb-4">나의 제안가: {biddingPrice}</div>
              <div>
                <Button
                  tw="w-full mb-4 h-9"
                  onClick={() => {
                    if (listingItem?.listing_id && biddingItem?.bidding_id) {
                      onClickNavigateToListingDetailHistory?.(listingItem?.listing_id, biddingItem?.bidding_id)();
                    }
                  }}
                >
                  상세 내용 보러가기
                </Button>
                <button onClick={handleClose} type="button" tw="block mx-auto underline text-info leading-4">
                  접기
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
