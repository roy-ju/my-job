import { Button } from '@/components/atoms';
import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';
import HouseIcon from '@/assets/icons/house_28.svg';
import { GetDashboardInfoResponse } from '@/apis/my/getDashboardInfo';

export interface MyListingsSummaryProps {
  dashboardInfo?: GetDashboardInfoResponse | null;
  onClickCreateListing?: () => void;
  onClickMyRegisteredListings?: (params: number) => void;
  onClickMyParticipatingListings?: (params: number) => void;
  onClickRecommendationForm?: () => void;
  onClickRequestedSuggests?: () => void;
  onClickReceivedSuggests?: () => void;
}

export default function MyListingsSummary({
  dashboardInfo,
  onClickCreateListing,
  onClickMyRegisteredListings,
  onClickMyParticipatingListings,
  onClickRecommendationForm,
  onClickRequestedSuggests,
}: MyListingsSummaryProps) {
  return (
    <div tw="bg-white px-5 pb-10 flex flex-col">
      <div tw="text-b1 leading-none font-bold mt-5 mb-4">중개사 추천 매물 확인</div>
      <div tw="flex gap-3 items-center rounded-lg py-2 mb-6 bg-gray-100">
        <Button onClick={onClickRequestedSuggests} variant="ghost" tw="hover:bg-gray-200 block flex-1 ml-1">
          <div tw="flex justify-between items-center">
            <div tw="text-info text-gray-1000">단지/지역 수</div>
            <div tw="text-b1 font-bold leading-6">{dashboardInfo?.suggest_sent_count ?? 0}</div>
          </div>
          <div tw="flex justify-between items-center">
            <div tw="text-info text-gray-700">추천받은 매물 수</div>
            <div tw="text-b1 font-bold leading-6">{dashboardInfo?.suggest_recommend_count ?? 0}</div>
          </div>
        </Button>

        <Button onClick={onClickRecommendationForm} tw="w-[132px] h-11 mr-5" variant="secondary">
          새 매물 추천받기
        </Button>
      </div>
      <div tw="text-b1 leading-none font-bold mb-4">나의 제안 현황</div>
      <div tw="bg-gray-100 rounded-lg h-16 mb-6 flex items-center">
        <Button
          onClick={() => onClickMyParticipatingListings?.(1)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">제안중</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.bidding_submitted_count ?? 0}</div>
        </Button>
        <div tw="w-px h-11 bg-gray-300" />
        <Button
          onClick={() => onClickMyParticipatingListings?.(2)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">협의중</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.bidding_accepted_count ?? 0}</div>
        </Button>

        <Button
          onClick={() => onClickMyParticipatingListings?.(3)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">거래성사</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.bidding_pre_contract_complete_count ?? 0}</div>
        </Button>
        <Button
          onClick={() => onClickMyParticipatingListings?.(4)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">지난거래</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.bidding_past_count ?? 0}</div>
        </Button>
      </div>
      <div tw="text-b1 leading-none font-bold mb-4">등록한 매물</div>
      <div tw="bg-gray-100 rounded-lg h-16 mb-6 flex items-center">
        <Button
          onClick={() => onClickMyRegisteredListings?.(1)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">등록신청</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.my_registering_listing_count ?? 0}</div>
        </Button>
        <div tw="w-px h-11 bg-gray-300" />
        <Button
          onClick={() => onClickMyRegisteredListings?.(2)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">거래중</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.my_active_listing_count ?? 0}</div>
        </Button>

        <Button
          onClick={() => onClickMyRegisteredListings?.(3)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">거래성사</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.my_contract_complete_listing_count ?? 0}</div>
        </Button>

        <Button
          onClick={() => onClickMyRegisteredListings?.(4)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">지난거래</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.my_cancelled_listing_count ?? 0}</div>
        </Button>
      </div>
      <Button
        variant="ghost"
        tw="w-full border border-nego-800 h-[60px] hover:bg-nego-100"
        onClick={onClickCreateListing}
      >
        <div tw="text-start w-full h-full flex items-center">
          <HouseIcon tw="mr-3" />
          <div tw="flex-1 flex flex-col gap-0.5">
            <div tw="text-b2 leading-4 font-bold">매물등록 신청</div>
            <div tw="text-info leading-4.5 text-gray-700">간편하게 등록하고 매물 거래해 보세요</div>
          </div>
          <ChevronLeftIcon width={16} height={16} tw="text-gray-700" style={{ transform: 'rotate(180deg)' }} />
        </div>
      </Button>
    </div>
  );
}
