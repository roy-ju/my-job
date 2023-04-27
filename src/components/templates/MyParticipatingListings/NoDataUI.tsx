import { Information } from '@/components/molecules';
import ExclamationMark from '@/assets/icons/exclamation_mark.svg';

enum BiddingStatus {
  Submitted = 1,
  Accepted = 2,
  PreContractCompleted = 3,
  Past = 4,
}

const title = {
  [BiddingStatus.Submitted]: '제안중인 매물이 없습니다.',
  [BiddingStatus.Accepted]: '협의중인 매물이 없습니다.',
  [BiddingStatus.PreContractCompleted]: '거래성사 매물이 없습니다.',
  [BiddingStatus.Past]: '지난거래 매물이 없습니다.',
};

export default function NoDataUI({ tabStatus }: { tabStatus: 1 | 2 | 3 | 4 }) {
  return (
    <div tw="flex-1 min-h-0 mt-7">
      <Information>
        <div tw="flex flex-col gap-4 items-center text-center">
          <ExclamationMark />
          <Information.Title>{title[tabStatus]}</Information.Title>
          <Information.Contents>
            네고시오에서 진행되고 있는 거래를 찾아
            <br />
            온라인으로 바로 네고를 시작해보세요
          </Information.Contents>
        </div>
      </Information>
    </div>
  );
}
