import { GetMySuggestRecommendedListResponse } from '@/apis/suggest/getMySuggestRecommendedList';
import { Avatar, Chip, Moment, Numeral, Button } from '@/components/atoms';
import { RealestateTypeChipVariant, TimeTypeString, RealestateTypeString } from '@/constants/strings';
import { BuyOrRent, SuggestStatus, SuggestRecommendStatus } from '@/constants/enums';
import React from 'react';

import ErrorIcon from '@/assets/icons/error.svg';
import tw, { css } from 'twin.macro';
import { ExpandableText } from '@/components/molecules';

interface Props {
  suggestItem: GetMySuggestRecommendedListResponse['list'][0]['suggest_item'];
  suggestRecommendItem: GetMySuggestRecommendedListResponse['list'][0]['suggest_recommend_item'];
  onNavigateToChatRoom?: (chatRoomId: number) => void;
  onDeleteSuggestRecommend?: (suggestRecommendId: number) => void;
  onClickSuggestRecommendCancel?: (suggestRecommendId: number) => void;
}

const Wrapper = tw.div``;

const informationStringWrapper = css`
  & > span:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 2px;
    color: #e9ecef; // text-gray-300
  }
`;

function PriceText({
  tradeOrDepositPrice,
  monthlyRentFee,
  quickSale,
}: {
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  quickSale?: boolean;
}) {
  if (quickSale) return <span>급매 구해요</span>;

  if (monthlyRentFee) {
    return (
      <>
        <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral> / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
      </>
    );
  }
  return <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral>;
}

function NegotiableChip() {
  return <div tw="text-white rounded-tl rounded-br text-info font-semibold bg-orange-700 px-1.5 h-5">협의가능</div>;
}

export default function SuggestRecommendedListItem({
  suggestItem,
  suggestRecommendItem,
  onClickSuggestRecommendCancel,
  onDeleteSuggestRecommend,
  onNavigateToChatRoom,
}: Props) {
  const suggestBuyOrRentText = Number(suggestItem?.buy_or_rents) === BuyOrRent.Buy ? '매매' : '전월세';
  const suggestRecommendBuyOrRentText = Number(suggestItem?.buy_or_rents) === BuyOrRent.Buy ? '매매' : '전월세';
  const isSuggestRecommendOptionField =
    suggestRecommendItem?.direction || suggestRecommendItem?.floor || suggestRecommendItem?.jeonyong_areas;

  const renderSuggestRecommendCTA = () => {
    if (suggestRecommendItem.suggest_recommend_status === SuggestRecommendStatus.Sent) {
      return (
        <Button
          onClick={() => {
            onClickSuggestRecommendCancel?.(suggestRecommendItem.suggest_recommend_id);
          }}
          tw="w-full border border-gray-300 bg-white text-gray-1000 hover:bg-gray-200 mt-4"
        >
          추천 취소
        </Button>
      );
    }
    if (
      suggestItem.suggest_status === SuggestStatus.UserDeleted ||
      suggestRecommendItem.suggest_recommend_status === SuggestRecommendStatus.Cancelled ||
      suggestRecommendItem.suggest_recommend_status === SuggestRecommendStatus.NotInterested
    )
      return (
        <Button
          onClick={() => {
            onDeleteSuggestRecommend?.(suggestRecommendItem.suggest_recommend_id);
          }}
          tw="w-full border border-gray-300 bg-white text-gray-1000 hover:bg-gray-200 mt-4"
        >
          삭제
        </Button>
      );

    if (suggestRecommendItem.suggest_recommend_status === SuggestRecommendStatus.Completed) {
      if (suggestRecommendItem.chat_room_id === null) {
        return null;
      }
      <Button
        onClick={() => {
          onNavigateToChatRoom?.(suggestRecommendItem.chat_room_id as number);
        }}
        tw="mt-4 w-full"
      >
        채팅방 바로가기
      </Button>;
    }
    if (suggestItem.suggest_status === SuggestStatus.Active) {
      return (
        <Button
          onClick={() => {
            onNavigateToChatRoom?.(suggestRecommendItem.chat_room_id as number);
          }}
          tw="mt-4 w-full"
        >
          채팅방 바로가기
        </Button>
      );
    }
  };
  const renderSuggestRecommendErrorMessage = () => {
    if (suggestItem.suggest_status === SuggestStatus.UserDeleted)
      return (
        <div tw="flex gap-1 mt-2">
          <ErrorIcon />
          <span tw="text-red-800 text-info leading-4">상대방이 요청을 삭제했어요.</span>
        </div>
      );
    if (suggestRecommendItem.suggest_recommend_status === SuggestRecommendStatus.NotInterested)
      return (
        <div tw="flex gap-1 mt-2">
          <ErrorIcon />
          <span tw="text-red-800 text-info leading-4">상대방이 추천을 거절했어요.</span>
        </div>
      );
    if (suggestRecommendItem.suggest_recommend_status === SuggestRecommendStatus.Cancelled)
      return (
        <div tw="flex gap-1 mt-2">
          <ErrorIcon />
          <span tw="text-red-800 text-info leading-4">상대방이 협의를 취소했어요.</span>
        </div>
      );
  };

  return (
    <div tw="border border-gray-300 rounded-lg p-4">
      <Wrapper>
        <div tw="flex justify-between items-center">
          <div tw="flex items-center gap-1">
            <Avatar
              src={suggestItem.user_profile_image_url}
              size={24}
              alt={`${suggestItem.user_nickname}의 프로필 사진`}
            />
            <span tw="text-gray-700 text-info">{suggestItem.user_nickname}</span>
          </div>
          <Moment tw="text-gray-700 text-info">{suggestItem.created_time}</Moment>
        </div>
        <div tw="mt-3">
          <Chip variant={RealestateTypeChipVariant[Number(suggestItem.realestate_types)]}>
            {RealestateTypeString[Number(suggestItem.realestate_types)]}
          </Chip>
          <span tw="text-gray-700 text-info ml-1">{suggestItem.request_target_text}</span>
        </div>
        <div tw="flex items-center mt-1">
          <div tw="text-b1 font-bold text-gray-1000 mr-1">
            {suggestBuyOrRentText}{' '}
            <PriceText
              tradeOrDepositPrice={suggestItem?.trade_or_deposit_price ?? 0}
              monthlyRentFee={suggestItem?.monthly_rent_fee ?? 0}
              quickSale={suggestItem?.quick_sale ?? false}
            />
          </div>
          {suggestItem?.negotiable && <NegotiableChip />}
        </div>
        <div tw="mt-1">
          {suggestItem?.pyoung_text && <div tw="text-gray-700 text-info">평형 {suggestItem.pyoung_text}</div>}
          {suggestItem?.move_in_date && (
            <div tw="text-gray-700 text-info">
              입주희망일 <Moment format="YY.MM.DD">{suggestItem?.move_in_date}</Moment>{' '}
              {TimeTypeString[suggestItem.move_in_date_type as number]}
            </div>
          )}
          {suggestItem?.purpose === '투자' && (
            <div tw="text-gray-700 text-info">
              투자예산 <Numeral koreanNumber>{suggestItem?.invest_amount}</Numeral>
            </div>
          )}
        </div>
        {suggestItem?.note && <ExpandableText tw="mt-3">{suggestItem?.note}</ExpandableText>}
      </Wrapper>
      <Wrapper tw="p-4 bg-gray-100 rounded-lg mt-4">
        <div tw="flex justify-between">
          <Chip
            variant={
              suggestRecommendItem.suggest_recommend_status === SuggestRecommendStatus.Completed
                ? 'red'
                : 'yellowOrange'
            }
          >
            {suggestRecommendItem.suggest_recommend_status === SuggestRecommendStatus.Completed
              ? '거래성사'
              : '우리집 추천중'}
          </Chip>
          <span tw="text-gray-700 text-info">
            추천일 <Moment format="yyyy.MM.DD">{suggestRecommendItem.created_time}</Moment>
          </span>
        </div>

        <div tw="text-b1 font-bold text-gray-1000 mr-1 mt-1">
          {suggestRecommendBuyOrRentText}{' '}
          <PriceText
            tradeOrDepositPrice={suggestRecommendItem?.trade_or_deposit_price ?? 0}
            monthlyRentFee={suggestRecommendItem?.monthly_rent_fee ?? 0}
          />
        </div>

        {suggestRecommendItem?.address_free_text && <div tw="text-info">{suggestRecommendItem?.address_free_text}</div>}
        {isSuggestRecommendOptionField && (
          <div tw="text-info text-gray-700 flex items-center" css={informationStringWrapper}>
            {suggestRecommendItem?.jeonyong_areas && (
              <span>
                전용{' '}
                {suggestRecommendItem?.jeonyong_areas ? Number(suggestRecommendItem.jeonyong_areas).toFixed(0) : '-'}㎡
              </span>
            )}
            {suggestRecommendItem?.floor && <span>{suggestRecommendItem?.floor}층</span>}
            {suggestRecommendItem?.direction && <span>{suggestRecommendItem?.direction}</span>}
          </div>
        )}
        {suggestRecommendItem?.note && <ExpandableText tw="mt-3">{suggestRecommendItem?.note}</ExpandableText>}
        {renderSuggestRecommendErrorMessage()}
        {renderSuggestRecommendCTA()}
      </Wrapper>
    </div>
  );
}
