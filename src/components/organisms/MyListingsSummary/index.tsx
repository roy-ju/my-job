import { Button } from '@/components/atoms';
import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';
import HouseIcon from '@/assets/icons/house_28.svg';
import { GetDashboardInfoResponse } from '@/apis/my/getDashboardInfo';

export interface MyListingsSummaryProps {
  dashboardInfo?: GetDashboardInfoResponse | null;
  onClickCreateListing?: () => void;
  onClickMyRegisteredListings?: (params: number) => void;
  onClickSuggestRegional?: () => void;
  onClickRequestedSuggests?: () => void;
  onClickReceivedSuggests?: () => void;
}

export default function MyListingsSummary({
  dashboardInfo,
  onClickCreateListing,
  onClickMyRegisteredListings,
  onClickSuggestRegional,
  onClickReceivedSuggests,
  onClickRequestedSuggests,
}: MyListingsSummaryProps) {
  return (
    <div tw="bg-white px-5 pb-10 flex flex-col">
      <div tw="mb-10">
        <div tw="flex py-3">
          <Button onClick={onClickRequestedSuggests} variant="ghost" size="none" tw="flex-1 h-[44px] hover:bg-gray-200">
            <div>
              <div tw="text-b1 font-bold text-blue-1000">{dashboardInfo?.suggest_sent_count ?? 0}</div>
              <div tw="text-info text-gray-700">나의 추천 요청</div>
            </div>
          </Button>
          <div tw="w-px mx-4 h-[44px] bg-gray-300" />
          <Button onClick={onClickReceivedSuggests} variant="ghost" size="none" tw="flex-1 h-[44px] hover:bg-gray-200">
            <div>
              <div tw="text-b1 font-bold text-red-1000">{dashboardInfo?.suggest_recommend_count ?? 0}</div>
              <div tw="text-info text-gray-700">추천받은 매물</div>
            </div>
          </Button>
        </div>
        <Button onClick={onClickSuggestRegional} tw="w-full" size="medium" variant="secondary">
          새로운 매물 추천 받아보기
        </Button>
      </div>
      <div tw="text-b1 leading-none font-bold mb-4">가격 제안한 매물</div>
      <div tw="bg-gray-100 rounded-lg h-16 mb-6 flex items-center">
        <Button size="none" variant="ghost" tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors">
          <div tw="text-info text-gray-700 leading-6">제안중</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.bidding_submitted_count ?? 0}</div>
        </Button>
        <div tw="w-px h-5 bg-gray-300" />
        <Button size="none" variant="ghost" tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors">
          <div tw="text-info text-gray-700 leading-6">협상중</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.bidding_accepted_count ?? 0}</div>
        </Button>
        <div tw="w-px h-5 bg-gray-300" />
        <Button size="none" variant="ghost" tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors">
          <div tw="text-info text-gray-700 leading-6">거래성사</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.bidding_pre_contract_complete_count ?? 0}</div>
        </Button>
        <Button size="none" variant="ghost" tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors">
          <div tw="text-info text-gray-700 leading-6">지난거래</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.bidding_past_count ?? 0}</div>
        </Button>
      </div>
      <div tw="text-b1 leading-none font-bold mb-4">등록한 매물</div>
      <div tw="bg-gray-100 rounded-lg h-16 mb-6 flex items-center">
        <div tw="w-px h-5 bg-gray-300" />
        <Button
          onClick={() => onClickMyRegisteredListings?.(1)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">등록신청</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.my_registering_listing_count ?? 0}</div>
        </Button>
        <Button
          onClick={() => onClickMyRegisteredListings?.(2)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">거래중</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.my_active_listing_count ?? 0}</div>
        </Button>
        <div tw="w-px h-5 bg-gray-300" />
        <Button
          onClick={() => onClickMyRegisteredListings?.(3)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">거래성사</div>
          <div tw="text-b1 font-bold leading-6">{dashboardInfo?.my_contract_complete_listing_count ?? 0}</div>
        </Button>
        <div tw="w-px h-5 bg-gray-300" />
        <Button
          onClick={() => onClickMyRegisteredListings?.(4)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">취소</div>
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
