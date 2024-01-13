import React from 'react';

import { css } from 'twin.macro';

import { Moment, Numeral } from '@/components/atoms';

import { ExpandableText } from '@/components/molecules';

import { SuggestRecommendDetailListItem } from '@/services/my/types';

import { SuggestRecommendStatus } from '@/constants/enums';

import { BuyOrRentString } from '@/constants/strings';

import ErrorIcon from '@/assets/icons/error.svg';

import useSuggestListItemCTAHandler from './hooks/useSuggestListItemCTAHandler';

type ListItemListingSectionProps = {
  item: SuggestRecommendDetailListItem;
  depth?: number;
};

const informationStringWrapper = css`
  & > span:not(:first-of-type)::before {
    content: '';
    width: 1px;
    height: 8px;
    background-color: #e9ecef;
    margin: 0 4px;
    display: inline-block;
  }
`;

export default function ListItemListingSection({ item, depth }: ListItemListingSectionProps) {
  const isOptionField = item?.direction || item?.floor || item?.jeonyong_areas;

  const { onClickNotInterested, onClickDeleteSuggestRecommendItem } = useSuggestListItemCTAHandler({ depth });

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

  const renderDeleteButton = () => {
    let text = '';
    let onClick: typeof onClickNotInterested | typeof onClickDeleteSuggestRecommendItem;
    if (item?.suggest_recommend_status === SuggestRecommendStatus.Cancelled) {
      text = '삭제';
      onClick = onClickDeleteSuggestRecommendItem;
    } else {
      text = '관심 없음';
      onClick = onClickNotInterested;
    }

    return (
      <button tw="text-gray-700 underline text-info" type="button" onClick={() => onClick(item.suggest_recommend_id)}>
        {text}
      </button>
    );
  };

  return (
    <div tw="p-4 rounded-lg bg-gray-100">
      <div tw="flex justify-between items-center">
        {renderMoments()}
        {renderDeleteButton()}
      </div>
      {renderContents()}
      <div tw="flex flex-col flex-1 pt-3">
        {item.note && <ExpandableText color="#868E96">{item?.note}</ExpandableText>}
        {item?.suggest_recommend_status === SuggestRecommendStatus.Cancelled && (
          <div tw="flex gap-1 mt-3">
            <ErrorIcon />
            <span tw="text-red-800 text-info leading-4">추천이 취소되었습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
}
