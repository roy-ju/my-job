import { Button, PersistentBottomBar, Separator } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import { ListingDetailSection } from '@/components/organisms';

export interface ListingCreateSummaryProps {
  listing?: any;

  isLoading?: boolean;
  onClickCreate?: () => void;
  onClickUpdate?: () => void;
}

export default function ListingCreateSummary({
  onClickCreate,
  onClickUpdate,
  isLoading,

  listing,
}: ListingCreateSummaryProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>매물등록 신청 최종 확인</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="pt-6 pb-10 px-5">
          <div tw="text-h2 font-bold mb-1">매물등록 신청 준비가 끝났습니다.</div>
          <div tw="text-info text-gray-700">아래 내용을 확인하시고, 매물등록 신청 버튼을 누르면 완료됩니다.</div>
        </div>
        <Separator />
        <div tw="py-10 px-5">
          <div tw="text-b1 font-bold mb-4">중개사 정보</div>
        </div>
        <Separator />
        <div tw="px-5 pt-10">
          <ListingDetailSection.Conditions
            listing={listing}
            debtSuccessions={listing?.debt_successions}
            collaterals={listing?.collaterals}
          />
        </div>
        <div tw="py-10 flex items-center justify-center">
          <Button variant="ghost" size="none" tw="underline text-info" onClick={onClickUpdate}>
            입력정보 수정/중개사 재선택
          </Button>
        </div>
      </div>
      <PersistentBottomBar>
        <Button isLoading={isLoading} size="bigger" tw="w-full" onClick={onClickCreate}>
          매물등록 신청
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
