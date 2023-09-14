import { Button } from '@/components/atoms';
import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';
import { GetDashboardInfoResponse } from '@/apis/my/getDashboardInfo';
import SaveIcon from '@/assets/icons/my_save_24.svg';
import RecommendationIcon from '@/assets/icons/my_recommendation_24.svg';
import SaleIcon from '@/assets/icons/my_sale_24.svg';
import HomeIcon from '@/assets/icons/my_home_24.svg';
import ChevronIcon from '@/assets/icons/my_chevron_16.svg';
import OfferIcon from '@/assets/icons/my_offer_24.svg';
// Save, Recommendation, Sale, Offer, My-Home
export interface MyListingsSummaryProps {
  dashboardInfo?: GetDashboardInfoResponse | null;
  onClickMyAddress?: () => void;
  onClickMyRegisteredListings?: (params: number) => void;
  onClickMyParticipatingListings?: (params: number) => void;
  onClickRecommendationForm?: () => void;
  onClickRequestedSuggests?: () => void;
  onClickReceivedSuggests?: () => void;
  onClickSuggestRecommendedList?: () => void;
}

export default function MyListingsSummary({
  dashboardInfo,
  onClickMyAddress,
  onClickMyRegisteredListings,
  onClickMyParticipatingListings,
  onClickRequestedSuggests,
  onClickSuggestRecommendedList,
}: MyListingsSummaryProps) {
  return (
    <div tw="bg-white px-5 pb-10 flex flex-col">
      <div tw="text-b1 leading-none font-bold mt-4 mb-2 pl-1">구하기</div>
      <div tw="flex flex-col gap-2 mb-6">
        <button
          onClick={onClickRequestedSuggests}
          tw="rounded-lg bg-gray-100 text-gray-1000 h-12 px-5 flex justify-between items-center"
          type="button"
        >
          <div tw="flex gap-2 items-center">
            <SaveIcon /> <span tw="text-b2 text-gray-1000">내가 등록한 구하기</span>
          </div>
          <div tw="flex gap-1 items-center">
            <span tw="text-b1 font-bold text-nego-1000 min-w-[12px] text-center">
              {dashboardInfo?.suggest_sent_count}
            </span>
            <ChevronIcon tw="mb-[2px]" />
          </div>
        </button>
        <button
          onClick={onClickSuggestRecommendedList}
          tw="rounded-lg bg-gray-100 text-gray-1000 h-12 px-5 flex justify-between items-center"
          type="button"
        >
          <div tw="flex gap-2 items-center">
            <RecommendationIcon /> <span tw="text-b2 text-gray-1000">타인 구하기에 대한 나의 추천</span>
          </div>
          <div tw="flex gap-1 items-center">
            <span tw="text-b1 font-bold text-nego-1000 min-w-[12px] text-center">
              {dashboardInfo?.suggest_recommended_count}
            </span>
            <ChevronIcon tw="mb-[2px]" />
          </div>
        </button>
      </div>

      <div tw="text-b1 leading-none font-bold mb-2 pl-1">매물</div>
      <div tw="flex flex-col gap-2 mb-6">
        <button
          onClick={() => {
            const items = [
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
            ];
            const filteredItems = items.filter((item) => item?.count && item.count > 0);

            if (!filteredItems.length) {
              const firstPriorityItem = [...items].sort((a, b) => a.priority - b.priority)[0];
              onClickMyRegisteredListings?.(firstPriorityItem.tab);
            } else if (filteredItems.length === 1) {
              const onlyOneItem = filteredItems[0];
              onClickMyRegisteredListings?.(onlyOneItem.tab);
            } else {
              const firstPriorityItem = [...filteredItems].sort((a, b) => a.priority - b.priority)[0];
              onClickMyRegisteredListings?.(firstPriorityItem.tab);
            }
          }}
          tw="rounded-lg bg-gray-100 text-gray-1000 h-12 px-5 flex justify-between items-center"
          type="button"
        >
          <div tw="flex gap-2 items-center">
            <SaleIcon /> <span tw="text-b2 text-gray-1000">내가 등록한 매물</span>
          </div>
          <div tw="flex gap-1 items-center">
            <span tw="text-b1 font-bold text-nego-1000 min-w-[12px] text-center">
              {(dashboardInfo?.my_registering_listing_count ?? 0) +
                (dashboardInfo?.my_active_listing_count ?? 0) +
                (dashboardInfo?.my_contract_complete_listing_count ?? 0)}
            </span>
            <ChevronIcon tw="mb-[2px]" />
          </div>
        </button>
        <button
          onClick={() => {
            const items = [
              {
                status: 'biddingSubmitted',
                count: dashboardInfo?.bidding_submitted_count,
                priority: 2,
                tab: 1,
              },
              {
                status: 'biddingAccepted',
                count: dashboardInfo?.bidding_accepted_count,
                priority: 1,
                tab: 2,
              },

              {
                status: 'biddingPreContractComplete',
                count: dashboardInfo?.bidding_pre_contract_complete_count,
                priority: 3,
                tab: 3,
              },
              {
                status: 'biddingPast',
                count: dashboardInfo?.bidding_past_count,
                priority: 4,
                tab: 4,
              },
            ];
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
          }}
          tw="rounded-lg bg-gray-100 text-gray-1000 h-12 px-5 flex justify-between items-center"
          type="button"
        >
          <div tw="flex gap-2">
            <OfferIcon />
            <span tw="text-b2 text-gray-1000">타인 매물에 대한 나의 가격제안</span>
          </div>
          <div tw="flex gap-1 items-center">
            <span tw="text-b1 font-bold text-nego-1000 min-w-[12px] text-center">
              {(dashboardInfo?.bidding_submitted_count ?? 0) +
                (dashboardInfo?.bidding_accepted_count ?? 0) +
                (dashboardInfo?.bidding_pre_contract_complete_count ?? 0) +
                (dashboardInfo?.bidding_past_count ?? 0)}
            </span>
            <ChevronIcon tw="mb-[2px]" />
          </div>
        </button>
      </div>

      <Button variant="ghost" tw="w-full border border-gray-300 h-[60px]" onClick={onClickMyAddress}>
        <div tw="text-start w-full h-full flex items-center">
          <HomeIcon tw="mr-3" />
          <div tw="flex-1 flex flex-col gap-0.5">
            <div tw="text-b2 leading-4 font-bold">주소 등록 ・ 집주인 인증</div>
            <div tw="text-info leading-4.5 text-gray-700">간편하게 주소등록하고, 집주인 인증받으세요.</div>
          </div>
          <ChevronLeftIcon width={16} height={16} tw="text-gray-700" style={{ transform: 'rotate(180deg)' }} />
        </div>
      </Button>
    </div>
  );
}
