import React from 'react';
import tw, { css } from 'twin.macro';
import { Button, Moment, Numeral } from '@/components/atoms';
import { ExpandableText } from '@/components/molecules';
import { SuggestRecommendDetailListItem } from '@/apis/suggest/getMySuggestRecommends';
import { SuggestRecommendStatus } from '@/constants/enums';
import ErrorIcon from '@/assets/icons/error.svg';
import { BuyOrRentString } from '@/constants/strings';
import useSuggestListItemCTAHandler from '../../hooks/useSuggestListItemCTAHandler';

type ListItemListingSectionProps = {
  item: SuggestRecommendDetailListItem;
};

const informationStringWrapper = css`
  & > span:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 2px;
    color: #e9ecef; // text-gray-300
  }
`;

export default function ListItemListingSection({ item }: ListItemListingSectionProps) {
  const isOptionField = item?.direction || item?.floor || item?.jeonyong_areas;

  const { onClickNotInterested, onClickChat, onClickDeleteSuggestRecommendItem, onClickRecommendAccept } =
    useSuggestListItemCTAHandler();

  const renderMoments = () => {
    if (item?.created_time) {
      return (
        <div tw="text-info text-gray-700 shrink-0 self-start">
          추천일 <Moment format="yyyy.MM.DD">{item?.created_time}</Moment>
        </div>
      );
    }
    return null;
  };

  const renderContents = () => {
    if (item?.with_address) {
      return (
        <div tw="pt-1">
          {!!item?.trade_or_deposit_price && (
            <div tw="flex gap-1 items-center">
              <div tw="text-b1 font-bold">
                {BuyOrRentString[item?.buy_or_rent ?? 0]} <Numeral koreanNumber>{item?.trade_or_deposit_price}</Numeral>
                {Boolean(item?.monthly_rent_fee) && (
                  <span>
                    {' / '}
                    <Numeral koreanNumber>{item?.monthly_rent_fee}</Numeral>
                  </span>
                )}
              </div>
            </div>
          )}
          {item?.address_free_text && <div tw="text-info">{item?.address_free_text}</div>}
          {isOptionField && (
            <div tw="text-info text-gray-700 flex items-center" css={informationStringWrapper}>
              {item?.jeonyong_areas && (
                <span>전용 {item?.jeonyong_areas ? Number(item.jeonyong_areas).toFixed(0) : '-'}㎡</span>
              )}
              {item?.floor && <span>{item?.floor}층</span>}
              {item?.direction && <span>{item?.direction}</span>}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const renderCTAs = () => {
    if (item?.suggest_recommend_status === SuggestRecommendStatus.Sent) {
      return (
        <div tw="w-full flex flex-row gap-3">
          <Button variant="outlined" onClick={() => onClickNotInterested(item.suggest_recommend_id)} tw="flex-1">
            관심 없음
          </Button>
          <Button
            variant="primary"
            onClick={() => onClickRecommendAccept(item.suggest_recommend_id)}
            tw="flex-1 whitespace-nowrap"
          >
            네고 협의 시작하기
          </Button>
        </div>
      );
    }

    if (item?.chat_room_id && item?.suggest_recommend_status === SuggestRecommendStatus.Accepted) {
      return (
        <Button variant="primary" onClick={() => onClickChat(item.chat_room_id)} tw="w-full">
          채팅방 바로가기
        </Button>
      );
    }

    if (item?.suggest_recommend_status === SuggestRecommendStatus.Cancelled) {
      return (
        <Button
          variant="outlined"
          onClick={() => onClickDeleteSuggestRecommendItem(item.suggest_recommend_id)}
          tw="w-full"
        >
          삭제
        </Button>
      );
    }

    return null;
  };

  return (
    <div tw="p-4 rounded-lg bg-gray-100">
      {renderMoments()}
      {renderContents()}
      <div tw="flex flex-col flex-1 pt-3" css={[renderCTAs() && tw`pb-4`]}>
        {item.note && <ExpandableText color="#868E96">{item?.note}</ExpandableText>}
        {item?.suggest_recommend_status === SuggestRecommendStatus.Cancelled && (
          <div tw="flex gap-1 mt-3">
            <ErrorIcon />
            <span tw="text-red-800 text-info leading-4">추천이 취소되었습니다.</span>
          </div>
        )}
      </div>
      <div>{renderCTAs()}</div>
    </div>
  );
}
