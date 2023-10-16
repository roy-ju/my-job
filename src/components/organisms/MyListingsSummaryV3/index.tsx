import { GetDashboardInfoResponse } from '@/apis/my/getDashboardInfo';
import NewTabs from '@/components/molecules/Tabs/NewTabs';
import { countFormat } from '@/utils/fotmat';
import { useCallback, useMemo } from 'react';
import ErrorIcon from '@/assets/icons/error_12.svg';
import ChevronIcon from '@/assets/icons/my_chevron_16.svg';
import { CTAButtons, NeedHomeVerify } from './components';

export interface MyListingsSummaryV3Props {
  dashboardInfo?: GetDashboardInfoResponse | null;
  tab?: number;
  hasAddress?: boolean;
  hasNotVerifiedAddress?: boolean;
  onClickMyAddress?: () => void;
  onClickMyRegisteredListings?: (params: number) => void;
  onClickMyParticipatingListings?: (params: number) => void;
  onClickRequestedSuggests?: () => void;
  onClickSuggestRecommendedList?: () => void;
  onClickTab?: (val: 1 | 2) => void;
  onClickMyRegisteredHomes?: () => void;
}

export default function MyListingsSummaryV3({
  dashboardInfo,
  tab,
  hasAddress,
  hasNotVerifiedAddress,
  onClickMyAddress,
  onClickMyRegisteredListings,
  onClickMyParticipatingListings,
  onClickRequestedSuggests,
  onClickSuggestRecommendedList,
  onClickTab,
  onClickMyRegisteredHomes,
}: MyListingsSummaryV3Props) {
  const myParticipatingItems = useMemo(
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

  const myRegisterdItems = useMemo(
    () => [
      {
        status: 'registering',
        count: dashboardInfo?.my_registering_listing_count,
        priority: 1,
        tab: 1,
      },

      {
        status: 'active',
        count: dashboardInfo?.my_active_listing_count,
        priority: 2,
        tab: 2,
      },
      {
        status: 'contractComplete',
        count: dashboardInfo?.my_contract_complete_listing_count,
        priority: 3,
        tab: 3,
      },
      {
        status: 'cancelled',
        count: dashboardInfo?.my_cancelled_listing_count,
        priority: 4,
        tab: 4,
      },
    ],
    [dashboardInfo],
  );

  const totalCountParticipatingTrading = useMemo(
    () =>
      countFormat({ value: dashboardInfo?.bidding_submitted_count }) +
      countFormat({ value: dashboardInfo?.bidding_accepted_count }) +
      countFormat({ value: dashboardInfo?.bidding_pre_contract_complete_count }) +
      countFormat({ value: dashboardInfo?.bidding_past_count }),
    [dashboardInfo],
  );

  const totalCountMyRegisteredListings = useMemo(
    () =>
      countFormat({ value: dashboardInfo?.my_registering_listing_count }) +
      countFormat({ value: dashboardInfo?.my_active_listing_count }) +
      countFormat({ value: dashboardInfo?.my_contract_complete_listing_count }),
    [dashboardInfo],
  );

  const onClickMyParticipatingListingsCTA = useCallback(() => {
    const filteredItems = myParticipatingItems.filter((item) => item?.count && item.count > 0);

    if (!filteredItems.length) {
      const firstPriorityItem = [...myParticipatingItems].sort((a, b) => a.priority - b.priority)[0];
      onClickMyParticipatingListings?.(firstPriorityItem.tab);
    } else if (filteredItems.length === 1) {
      const onlyOneItem = filteredItems[0];
      onClickMyParticipatingListings?.(onlyOneItem.tab);
    } else {
      const firstPriorityItem = [...filteredItems].sort((a, b) => a.priority - b.priority)[0];
      onClickMyParticipatingListings?.(firstPriorityItem.tab);
    }
  }, [myParticipatingItems, onClickMyParticipatingListings]);

  const onClickMyRegisterdListingsCTA = useCallback(() => {
    const filteredItems = myRegisterdItems.filter((item) => item?.count && item.count > 0);

    if (!filteredItems.length) {
      const firstPriorityItem = [...myRegisterdItems].sort((a, b) => a.priority - b.priority)[0];
      onClickMyRegisteredListings?.(firstPriorityItem.tab);
    } else if (filteredItems.length === 1) {
      const onlyOneItem = filteredItems[0];
      onClickMyRegisteredListings?.(onlyOneItem.tab);
    } else {
      const firstPriorityItem = [...filteredItems].sort((a, b) => a.priority - b.priority)[0];

      onClickMyRegisteredListings?.(firstPriorityItem.tab);
    }
  }, [myRegisterdItems, onClickMyRegisteredListings]);

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
          <CTAButtons
            type="requestedSuggests"
            onClickRequestedSuggestsCTA={onClickRequestedSuggests}
            count={countFormat({ value: dashboardInfo?.suggest_sent_count })}
          />
        )}

        {tab === 1 && (
          <CTAButtons
            type="myParticipatingListings"
            onClickMyParticipatingListingsCTA={onClickMyParticipatingListingsCTA}
            count={totalCountParticipatingTrading}
          />
        )}

        {tab === 2 && !hasAddress && !hasNotVerifiedAddress && (
          <>
            <div tw="min-h-[4px]" />
            <NeedHomeVerify onClickCTA={onClickMyAddress} />
          </>
        )}

        {tab === 2 && (hasAddress || hasNotVerifiedAddress) && (
          <button
            type="button"
            onClick={onClickMyRegisteredHomes}
            tw="flex items-center gap-1 ml-auto text-gray-800 hover:text-gray-1000"
          >
            {hasNotVerifiedAddress && <ErrorIcon />}
            <span tw="text-info">우리집 정보</span>
            <ChevronIcon />
          </button>
        )}

        {tab === 2 && (hasAddress || hasNotVerifiedAddress) && (
          <CTAButtons
            type="myRegisterdListings"
            onClickMyRegisterdListingsCTA={onClickMyRegisterdListingsCTA}
            count={totalCountMyRegisteredListings}
          />
        )}

        {tab === 2 && (hasAddress || hasNotVerifiedAddress) && (
          <CTAButtons
            type="suggestRecommendedList"
            onClickSuggestRecommendedListCTA={onClickSuggestRecommendedList}
            count={countFormat({ value: dashboardInfo?.suggest_recommended_count })}
          />
        )}
      </div>
    </div>
  );
}
