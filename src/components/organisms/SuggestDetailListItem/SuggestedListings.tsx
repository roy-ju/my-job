import { cancelRecommend } from '@/apis/suggest/cancelRecommend';
import { GetMyRecommendedListResponse } from '@/apis/suggest/getMyRecommendedList';
import ChevronDown from '@/assets/icons/chevron_down.svg';
import { Button, Chip, Numeral } from '@/components/atoms';
import { ExpandableText, OverlayPresenter, Popup } from '@/components/molecules';
import { describeBuyOrRent, SuggestRecommendStatus, SuggestStatus } from '@/constants/enums';
import { isNumber } from 'lodash';

import React, { useCallback, useState } from 'react';

type Props = {
  suggestStatus?: number;
  list?: GetMyRecommendedListResponse['list'];
  onMutate?: () => void;
};

type Item = {
  suggestStatus?: number;
  item: {
    suggest_recommend_id: number;
    suggest_recommend_status: number;
    with_address: boolean;
    address_free_text: string;
    trade_or_deposit_price: number;
    monthly_rent_fee: number;
    jeonyong_areas: string;
    floor: string;
    direction: string;
    buy_or_rent: number;
    note: string;
  };
  onMutate?: () => void;
};

function PriceText({ tradeOrDepositPrice, monthlyRentFee }: { tradeOrDepositPrice: number; monthlyRentFee: number }) {
  if (!tradeOrDepositPrice && !monthlyRentFee) return null;

  if (monthlyRentFee) {
    return (
      <>
        <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral> / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
      </>
    );
  }
  return <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral>;
}

function SuggestedListingItem({ suggestStatus, item, onMutate }: Item) {
  const [open, setOpen] = useState(false);

  const handlePopup = useCallback((val: boolean) => {
    setOpen(val);
  }, []);

  const handleCancel = useCallback(
    async (id: number) => {
      await cancelRecommend(id);
      await onMutate?.();
      handlePopup(false);
    },
    [handlePopup, onMutate],
  );

  return (
    <>
      <div tw="not-last-of-type:[border-bottom: 1px solid #E9ECEF] py-5">
        <div tw="flex items-center justify-between mb-1.5">
          {suggestStatus === SuggestStatus.Completed && <Chip variant="red">거래성사</Chip>}

          {suggestStatus !== SuggestStatus.Completed &&
            item.suggest_recommend_status === SuggestRecommendStatus.Sent && <Chip variant="gray">대기중</Chip>}

          {suggestStatus !== SuggestStatus.Completed &&
            item.suggest_recommend_status === SuggestRecommendStatus.Accepted && <Chip variant="nego">협의중</Chip>}

          {suggestStatus !== SuggestStatus.Completed &&
            item.suggest_recommend_status === SuggestRecommendStatus.Sent && (
              <Button
                variant="ghost"
                tw="[text-decoration-line: underline] h-4 pr-0 text-info"
                onClick={() => handlePopup(true)}
              >
                취소
              </Button>
            )}
        </div>

        <div tw="text-b1 font-bold">
          {describeBuyOrRent(item.buy_or_rent)}&nbsp;
          <PriceText tradeOrDepositPrice={item.trade_or_deposit_price} monthlyRentFee={item.monthly_rent_fee} />
        </div>

        {item.address_free_text && <p tw="text-info">{item.address_free_text}</p>}

        <div tw="flex items-center gap-1">
          {item.jeonyong_areas && <span tw="text-info text-gray-700">전용 {item.jeonyong_areas}㎡</span>}

          {item.floor && (
            <>
              {item.jeonyong_areas && <div tw="[height: 8px] [width: 1px] bg-gray-300" />}
              <span tw="text-info text-gray-700">{isNumber(Number(item.floor)) ? `${item.floor}층` : item.floor}</span>
            </>
          )}

          {item.direction && (
            <>
              {(item.floor || item.jeonyong_areas) && <div tw="[height: 8px] [width: 1px] bg-gray-300" />}
              <span tw="text-info text-gray-700">{item.direction}</span>
            </>
          )}
        </div>

        {item?.note && <ExpandableText tw="mt-3">{item.note}</ExpandableText>}
      </div>

      {open && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SmallTitle>추천을 취소하시겠습니까?</Popup.SmallTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => handlePopup(false)}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={() => handleCancel(item.suggest_recommend_id)}>추천 취소</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}

export default function SuggestedListings({ suggestStatus, list, onMutate }: Props) {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <>
      <button
        tw="w-full flex justify-between gap-4 mt-10"
        type="button"
        onClick={() => {
          setShowDetails((prev) => !prev);
        }}
      >
        <p tw="text-h2 [letter-spacing: -0.25px] font-bold">내가 추천한 매물</p>
        <div>
          <ChevronDown
            role="presentation"
            style={{
              transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out',
              alignSelf: 'top',
            }}
          />
        </div>
      </button>
      {showDetails &&
        list?.map((item) => (
          <SuggestedListingItem
            key={item.suggest_recommend_id}
            item={item}
            onMutate={onMutate}
            suggestStatus={suggestStatus}
          />
        ))}
    </>
  );
}
