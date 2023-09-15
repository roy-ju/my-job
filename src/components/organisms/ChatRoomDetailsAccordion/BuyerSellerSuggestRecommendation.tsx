import { Button, Chip, Moment, Numeral } from '@/components/atoms';
import { useControlled } from '@/hooks/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext } from 'react';
import tw, { css } from 'twin.macro';
import { BuyOrRentString, TimeTypeString } from '@/constants/strings';
import { BuyOrRent, SuggestRecommendStatus } from '@/constants/enums';
import CheckCircleIcon from '@/assets/icons/check_circle_purple_16.svg';
import ChatRoomDetailsAccordionContext from './ChatRoomDetailsAccordionContext';

interface Props {
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
  defaultExpanded?: boolean;
}

const suggestRecommendDetailsStyles = css`
  & > div:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 4px;
    color: #e9ecef; // text-gray-300
  }
`;

export default function BuyerAgentSuggestRecommendation({
  expanded: expnadedProps,
  onChange,
  defaultExpanded = false,
}: Props) {
  const [expanded, setExpanded] = useControlled({ controlled: expnadedProps, default: defaultExpanded });

  const { suggestItem, suggestRecommendItem, onClickContractCtaButton } = useContext(ChatRoomDetailsAccordionContext);

  const handleExpand = () => {
    setExpanded(true);
    onChange?.(true);
  };
  const handleClose = () => {
    setExpanded(false);
    onChange?.(false);
  };

  const suggestTransactionType = Number(suggestItem?.buy_or_rents) === BuyOrRent.Buy ? '매매' : '전월세';
  const suggestrecommendTransactionType = suggestRecommendItem
    ? BuyOrRentString[suggestRecommendItem?.buy_or_rent]
    : '';

  const isSuggestOptionsExist = suggestItem?.pyoung_text || suggestItem?.note || suggestItem?.move_in_date;
  const isSuggestRecommendOptionsExist =
    suggestRecommendItem?.jeonyong_areas || suggestRecommendItem?.floor || suggestRecommendItem?.direction;

  const suggestPrice = (() => {
    if (suggestItem?.quick_sale) return '(급매 구해요)';

    return suggestItem && suggestItem?.monthly_rent_fee > 0 ? (
      <span>
        <Numeral koreanNumber>{suggestItem?.trade_or_deposit_price}</Numeral>
        {' / '}
        <Numeral koreanNumber>{suggestItem?.monthly_rent_fee}</Numeral>
      </span>
    ) : (
      <Numeral koreanNumber>{suggestItem?.trade_or_deposit_price}</Numeral>
    );
  })();

  const suggestRecommendPrice =
    suggestRecommendItem?.buy_or_rent === BuyOrRent.Wolsae ? (
      <span>
        <Numeral koreanNumber>{suggestRecommendItem.trade_or_deposit_price}</Numeral>
        {' / '}
        <Numeral koreanNumber>{suggestRecommendItem.monthly_rent_fee}</Numeral>
      </span>
    ) : (
      <Numeral koreanNumber>{suggestRecommendItem?.trade_or_deposit_price}</Numeral>
    );

  const suggestRecommendDetails = (
    <div tw="flex text-gray-700" css={suggestRecommendDetailsStyles}>
      {suggestRecommendItem?.jeonyong_areas && (
        <div>{`전용 ${Math.floor(+suggestRecommendItem.jeonyong_areas)}㎡`}</div>
      )}
      {suggestRecommendItem?.floor && <div>{suggestRecommendItem.floor}층</div>}
      {suggestRecommendItem?.direction && <div>{suggestRecommendItem.direction}</div>}
    </div>
  );

  const isContractCompleted = suggestRecommendItem?.suggest_recommend_status === SuggestRecommendStatus.Completed;

  return (
    <div tw="bg-white px-5 border-t border-b border-gray-300" css={expanded && tw`rounded-b-[20px]`}>
      <div tw="flex justify-between py-4">
        <div tw="flex items-center gap-1 line-clamp-1">
          <Chip variant="gray" tw="[vertical-align: text-bottom]">
            추천 사항
          </Chip>{' '}
          <span tw="text-b1">
            {suggestRecommendItem?.with_address ? (
              <>
                {suggestrecommendTransactionType} <>{suggestRecommendPrice}</>
              </>
            ) : (
              suggestRecommendItem?.note
            )}
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
            <div tw="flex flex-col gap-3  text-info mb-4">
              {isSuggestRecommendOptionsExist && suggestRecommendDetails}
              <div>{suggestRecommendItem?.note}</div>
            </div>
            <div tw="border-t border-gray-300 pb-5">
              <div tw="flex items-center gap-1  py-4">
                <Chip variant="outlined" tw="[vertical-align: text-bottom]">
                  나의 요청사항
                </Chip>{' '}
                <span tw="text-b1">
                  {suggestTransactionType} {suggestPrice}
                </span>
              </div>
              {isSuggestOptionsExist && (
                <div tw="text-info flex flex-col gap-3 mb-4">
                  <div tw=" text-gray-700">
                    {suggestItem?.pyoung_text && <div>평형 {suggestItem?.pyoung_text}</div>}
                    {suggestItem?.move_in_date && (
                      <div>
                        입주희망일 <Moment format="YY.MM.DD">{suggestItem?.move_in_date}</Moment>{' '}
                        {TimeTypeString[suggestItem?.move_in_date_type]}
                      </div>
                    )}
                  </div>
                  {suggestItem?.note && <div>{suggestItem?.note}</div>}
                </div>
              )}
              {isContractCompleted && (
                <div tw="flex items-center mb-4">
                  <CheckCircleIcon tw="shrink-0" />
                  <span tw="text-info pl-1 text-nego-1000">거래가 성사되었습니다.</span>
                </div>
              )}
              <div tw="flex gap-2">
                <Button tw="w-full h-9" variant="outlined" onClick={handleClose}>
                  접어두기
                </Button>
                {!isContractCompleted && (
                  <Button tw="w-full h-9" onClick={onClickContractCtaButton}>
                    거래성사
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
