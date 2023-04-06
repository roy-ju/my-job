import { NavigationHeader } from '@/components/molecules';

export interface ListingCreateOwnerProps {
  // address?: string;
  // addressDetail?: string;
  // onClickNext?: () => void;
}

export default function ListingCreateOwner() {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div>
          <div tw="text-b1 leading-none mb-3">매물 주소</div>
          <div tw="text-b1">경기도 성남시 분당구 동판교로 156 삼평동</div>
          <div tw="text-info text-gray-700">봇들마을9단지 금호어울림 아파트 101동 101호</div>
        </div>
      </div>
    </div>
  );
}
