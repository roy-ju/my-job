import React, { useMemo, useState } from 'react';
import { Avatar, Chip } from '@/components/atoms';
import { Accordion } from '@/components/molecules';
import { SuggestRecommendDetailList } from '@/apis/suggest/getMySuggestRecommends';
import ChevronDown from '@/assets/icons/arrow_right_16.svg';
import CloseContainedGray from '@/assets/icons/close_contained_gray.svg';
import Success from '@/assets/icons/success.svg';
import tw from 'twin.macro';
import { css } from '@emotion/react';
import { SuggestCompleteHistoryStatus } from '@/constants/enums';

type ListItemTitleSectionProps = {
  item: SuggestRecommendDetailList;
};

export default function ListItemTitleSection({ item }: ListItemTitleSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const isAgent = item?.is_agent;
  const agentSuggestCompleteHistoryStatus = item.agent_suggest_complete_history_status;
  const title = `${item?.recommender_name} ${isAgent ? '중개사의 추천' : '님의 추천 매물'}`;

  const text = useMemo(() => {
    if (agentSuggestCompleteHistoryStatus === SuggestCompleteHistoryStatus.Cancelled) {
      return (
        <div tw="flex flex-row items-center gap-1">
          <CloseContainedGray />
          <span tw="text-info [line-height: 1] font-bold text-gray-700">거래성사가 취소되었습니다.</span>
        </div>
      );
    }

    if (
      agentSuggestCompleteHistoryStatus === SuggestCompleteHistoryStatus.New ||
      agentSuggestCompleteHistoryStatus === SuggestCompleteHistoryStatus.Updated
    ) {
      return (
        <div tw="flex flex-row items-center gap-1">
          <Success />
          <span tw="text-info [line-height: 1] font-bold text-green-800">거래성사가 완료되었습니다.</span>
        </div>
      );
    }

    return '';
  }, [agentSuggestCompleteHistoryStatus]);

  return isAgent ? (
    <>
      <Accordion expanded={expanded} onChange={(val) => setExpanded(val)}>
        <Accordion.Summary tw="w-full mb-4" hideArrow>
          <div tw="w-full flex flex-row items-center justify-between gap-1">
            <Avatar size={24} alt="profile_img" src={item?.recommender_profile_image_url} />
            <p tw="text-b2 font-bold">{title}</p>
            <p tw="text-info text-gray-700 ml-auto [display: inline-block]">중개사정보</p>

            <ChevronDown
              role="presentation"
              style={{
                transform: expanded ? 'rotate(270deg)' : 'rotate(90deg)',
                transition: 'transform 0.2s ease-in-out',
                alignSelf: 'top',
              }}
            />
          </div>
        </Accordion.Summary>

        <Accordion.Details
          tw="flex flex-col px-4 [border-radius: 8px]"
          css={[
            tw`border border-gray-300`,
            css`
              div {
                border-bottom: 1px solid #e9ecef;
              }
              div:last-child {
                border-bottom: none;
              }
            `,
          ]}
        >
          {item?.agent_office_name && (
            <div tw="flex flex-row items-center gap-3 text-info py-2">
              <span tw="w-[72px] text-gray-700">중개 사무소명</span>
              <p>{item.agent_office_name}</p>
            </div>
          )}

          {item?.agent_office_address && (
            <div tw="flex flex-row items-center gap-3 text-info py-2">
              <span tw="w-[72px] text-gray-700">중개 주소</span>
              <p>{item.agent_office_address}</p>
            </div>
          )}

          {item?.agent_office_phone && (
            <div tw="flex flex-row items-center gap-3 text-info py-2">
              <span tw="w-[72px] text-gray-700">전화번호</span>
              <p>{item.agent_office_phone}</p>
            </div>
          )}
        </Accordion.Details>
      </Accordion>
      {!!text && <div>{text}</div>}
    </>
  ) : (
    <div tw="flex flex-row items-center gap-1">
      <Avatar size={24} alt="profile_img" src={item?.recommender_profile_image_url} />
      <p tw="text-b2 font-bold">{title}</p>
      <Chip variant="nego" tw="ml-auto">
        집주인
      </Chip>
    </div>
  );
}
