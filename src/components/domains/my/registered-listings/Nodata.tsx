import { Button } from '@/components/atoms';

import { Information } from '@/components/molecules';

import ExclamationMark from '@/assets/icons/exclamation_mark.svg';

enum MyRegisteredListingStatus {
  RegisteringListing = 1, // 등록신청
  ActiveListing = 2, // 거래중
  ContractCompleteListing = 3, // 거래성사
  CancelledListing = 4, // 지난거래
}

const title = {
  [MyRegisteredListingStatus.RegisteringListing]: '등록신청한 매물이 없습니다.',
  [MyRegisteredListingStatus.ActiveListing]: '거래중인 매물이 없습니다.',
  [MyRegisteredListingStatus.ContractCompleteListing]: '거래성사 매물이 없습니다.',
  [MyRegisteredListingStatus.CancelledListing]: '지난거래 매물이 없습니다.',
};

export default function Nodata({ tabStatus, onClick }: { tabStatus: 1 | 2 | 3 | 4; onClick: () => void }) {
  return (
    <div tw="flex-1 min-h-0 mt-7">
      <Information>
        <div tw="flex flex-col gap-4 items-center text-center">
          <ExclamationMark />
          <Information.Title>{title[tabStatus]}</Information.Title>
          <Information.Contents>
            거래가 필요한 매물을 등록하고
            <br />
            온라인으로 네고를 시작해보세요
          </Information.Contents>
          <Button size="medium" onClick={onClick}>
            매물등록 신청하기
          </Button>
        </div>
      </Information>
    </div>
  );
}
