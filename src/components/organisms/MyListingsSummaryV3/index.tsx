import { Button } from '@/components/atoms';
import { GetDashboardInfoResponse } from '@/apis/my/getDashboardInfo';
import SaveIcon from '@/assets/icons/my_save_24.svg';
import RecommendationIcon from '@/assets/icons/my_recommendation_24.svg';
import SaleIcon from '@/assets/icons/my_sale_24.svg';
import HomeIcon from '@/assets/icons/my_home_24.svg';
import ChevronIcon from '@/assets/icons/my_chevron_16.svg';
import OfferIcon from '@/assets/icons/my_offer_24.svg';
import NewTabs from '@/components/molecules/Tabs/NewTabs';
import tw from 'twin.macro';
import { countFormat } from '@/utils/fotmat';
import { useCallback, useMemo } from 'react';

export interface MyListingsSummaryV3Props {
  dashboardInfo?: GetDashboardInfoResponse | null;
  tab?: number;
  onClickMyAddress?: () => void;
  onClickMyRegisteredListings?: (params: number) => void;
  onClickMyParticipatingListings?: (params: number) => void;
  onClickRecommendationForm?: () => void;
  onClickRequestedSuggests?: () => void;
  onClickSuggestRecommendedList?: () => void;
  onClickTab?: (val: 1 | 2) => void;
}

export default function MyListingsSummaryV3({
  dashboardInfo,
  tab,
  onClickMyAddress,
  onClickMyRegisteredListings,
  onClickMyParticipatingListings,
  onClickRequestedSuggests,
  onClickSuggestRecommendedList,
  onClickTab,
}: MyListingsSummaryV3Props) {
  const items = useMemo(
    () => [
      {
        status: 'biddingSubmitted',
        count: countFormat({ value: dashboardInfo?.bidding_submitted_count }),
        priority: 2,
        tab: 1,
      },
      {
        status: 'biddingAccepted',
        count: countFormat({ value: dashboardInfo?.bidding_accepted_count }),
        priority: 1,
        tab: 2,
      },

      {
        status: 'biddingPreContractComplete',
        count: countFormat({ value: dashboardInfo?.bidding_pre_contract_complete_count }),
        priority: 3,
        tab: 3,
      },
      {
        status: 'biddingPast',
        count: countFormat({ value: dashboardInfo?.bidding_past_count }),
        priority: 4,
        tab: 4,
      },
    ],
    [dashboardInfo],
  );

  const onClickMyParticipatingListingsCTA = useCallback(() => {
    const filteredItems = items.filter((item) => item?.count && item.count > 0);

    if (!filteredItems.length) {
      const firstPriorityItem = [...items].sort((a, b) => a.priority - b.priority)[0];
      onClickMyParticipatingListings?.(firstPriorityItem.tab);
    } else if (filteredItems.length === 1) {
      const onlyOneItem = filteredItems[0];
      onClickMyParticipatingListings?.(onlyOneItem.tab);
    } else {
      const firstPriorityItem = [...filteredItems].sort((a, b) => a.priority - b.priority)[0];
      onClickMyParticipatingListings?.(firstPriorityItem.tab);
    }
  }, [items, onClickMyParticipatingListings]);

  const totalCountParticipatingTrading = useMemo(
    () =>
      countFormat({ value: dashboardInfo?.bidding_submitted_count }) +
      countFormat({ value: dashboardInfo?.bidding_accepted_count }) +
      countFormat({ value: dashboardInfo?.bidding_pre_contract_complete_count }) +
      countFormat({ value: dashboardInfo?.bidding_past_count }),
    [dashboardInfo],
  );

  return (
    <div tw="bg-white flex flex-col">
      <NewTabs variant="contained" value={tab} onChange={(v) => onClickTab?.(v as 1 | 2)}>
        <NewTabs.Tab value={1}>
          <span tw="text-b2 leading-4">새집 구하기</span>
        </NewTabs.Tab>
        <NewTabs.Tab value={2}>
          <span tw="text-b2 leading-4">우리집 내놓기</span>
        </NewTabs.Tab>
        <NewTabs.Indicator />
      </NewTabs>

      <div tw="pt-6 pb-10 px-5 w-full flex flex-col gap-3">
        {tab === 1 && (
          <button
            tw="w-full rounded-lg bg-gray-100 text-gray-1000 h-[66px] px-5 py-3 justify-between hover:bg-gray-200 transition-colors flex items-center"
            type="button"
            onClick={onClickRequestedSuggests}
          >
            <div tw="flex flex-col gap-1">
              <div tw="flex gap-2 items-center">
                <SaveIcon />
                <span tw="text-b2 text-gray-1000">구하기 게시 내역</span>
              </div>

              <div tw="flex gap-2 items-center">
                <span tw="text-info text-gray-700">구하기 게시하고, 매물을 추천받아요.</span>
              </div>
            </div>

            <div tw="flex gap-1 items-center">
              <span tw="text-b1 font-bold text-nego-1000 min-w-[12px] text-center">
                {countFormat({ value: dashboardInfo?.suggest_sent_count })}
              </span>
              <ChevronIcon tw="mb-[2px]" />
            </div>
          </button>
        )}

        {tab === 1 && (
          <button
            tw="w-full rounded-lg bg-gray-100 text-gray-1000 h-[66px] px-5 py-3 justify-between hover:bg-gray-200 transition-colors flex items-center"
            type="button"
            onClick={onClickMyParticipatingListingsCTA}
          >
            <div tw="flex flex-col gap-1">
              <div tw="flex gap-2 items-center">
                <OfferIcon />
                <span tw="text-b2 text-gray-1000">가격 제안 내역</span>
              </div>

              <div tw="flex gap-2 items-center">
                <span tw="text-info text-gray-700">등록된 매물에 원하는 가격을 제안해요.</span>
              </div>
            </div>

            <div tw="flex gap-1 items-center">
              <span tw="text-b1 font-bold text-nego-1000 min-w-[12px] text-center">
                {totalCountParticipatingTrading}
              </span>
              <ChevronIcon tw="mb-[2px]" />
            </div>
          </button>
        )}

        {tab === 2 && (
          <button
            tw="w-full rounded-lg bg-gray-100 text-gray-1000 h-[66px] px-5 py-3 justify-between hover:bg-gray-200 transition-colors flex items-center"
            type="button"
          >
            <div tw="flex flex-col gap-1">
              <div tw="flex gap-2 items-center">
                <SaveIcon />
                <span tw="text-b2 text-gray-1000">매물 등록 내역</span>
              </div>

              <div tw="flex gap-2 items-center">
                <span tw="text-info text-gray-700">우리집을 매물로 등록해서 가격제안 받아요.</span>
              </div>
            </div>

            <div tw="flex gap-1 items-center">
              <span tw="text-b1 font-bold text-nego-1000 min-w-[12px] text-center">0</span>
              <ChevronIcon tw="mb-[2px]" />
            </div>
          </button>
        )}

        {tab === 2 && (
          <button
            tw="w-full rounded-lg bg-gray-100 text-gray-1000 h-[66px] px-5 py-3 justify-between hover:bg-gray-200 transition-colors flex items-center"
            type="button"
          >
            <div tw="flex flex-col gap-1">
              <div tw="flex gap-2 items-center">
                <OfferIcon />
                <span tw="text-b2 text-gray-1000">우리집 추천 내역</span>
              </div>

              <div tw="flex gap-2 items-center">
                <span tw="text-info text-gray-700">집을 구하는 사람에게 우리집을 추천해 거래를 제안해요.</span>
              </div>
            </div>

            <div tw="flex gap-1 items-center">
              <span tw="text-b1 font-bold text-nego-1000 min-w-[12px] text-center">0</span>
              <ChevronIcon tw="mb-[2px]" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
