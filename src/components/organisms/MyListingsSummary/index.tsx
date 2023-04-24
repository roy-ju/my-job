import { Button } from '@/components/atoms';
import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';
import HouseIcon from '@/assets/icons/house_28.svg';

export interface MyListingsSummaryProps {
  totalParticipatingCount?: number;
  negotiatingCount?: number;
  participationCompletedCount?: number;
  totalRegisteredCount?: number;
  waitingCount?: number;
  registeredCount?: number;
  onClickCreateListing?: () => void;
  onClickMyRegisteredListings?: (params: number) => void;
}

export default function MyListingsSummary({
  totalParticipatingCount = 0,
  onClickCreateListing,
  onClickMyRegisteredListings,
}: MyListingsSummaryProps) {
  return (
    <div tw="bg-white px-5 py-10 flex flex-col">
      <div tw="text-b1 leading-none font-bold mb-4">가격 제안한 매물</div>
      <div tw="bg-gray-100 rounded-lg h-16 mb-6 flex items-center">
        <Button size="none" variant="ghost" tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors">
          <div tw="text-info text-gray-700 leading-6">전체</div>
          <div tw="text-b1 font-bold leading-6 text-nego-1000">{totalParticipatingCount}</div>
        </Button>
        <div tw="w-px h-5 bg-gray-300" />
        <Button size="none" variant="ghost" tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors">
          <div tw="text-info text-gray-700 leading-6">협상중</div>
          <div tw="text-b1 font-bold leading-6">0</div>
        </Button>
        <div tw="w-px h-5 bg-gray-300" />
        <Button size="none" variant="ghost" tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors">
          <div tw="text-info text-gray-700 leading-6">거래성사</div>
          <div tw="text-b1 font-bold leading-6">0</div>
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
          <div tw="text-info text-gray-700 leading-6">전체</div>
          <div tw="text-b1 font-bold leading-6 text-red-1000">0</div>
        </Button>
        <div tw="w-px h-5 bg-gray-300" />
        <Button
          onClick={() => onClickMyRegisteredListings?.(2)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">등록신청</div>
          <div tw="text-b1 font-bold leading-6">0</div>
        </Button>
        <div tw="w-px h-5 bg-gray-300" />
        <Button
          onClick={() => onClickMyRegisteredListings?.(3)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">진행중</div>
          <div tw="text-b1 font-bold leading-6">0</div>
        </Button>
        <div tw="w-px h-5 bg-gray-300" />
        <Button
          onClick={() => onClickMyRegisteredListings?.(4)}
          size="none"
          variant="ghost"
          tw="flex-1 flex flex-col h-full hover:bg-gray-200 transition-colors"
        >
          <div tw="text-info text-gray-700 leading-6">종료</div>
          <div tw="text-b1 font-bold leading-6">0</div>
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
