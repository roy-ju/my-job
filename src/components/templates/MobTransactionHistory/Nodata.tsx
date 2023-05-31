import { Information } from '@/components/molecules';
import ExclamationMark from '@/assets/icons/exclamation_mark.svg';
import { Button } from '@/components/atoms';

export default function NoData() {
  return (
    <div tw="mt-12">
      <Information>
        <div tw="flex flex-col gap-4 items-center text-center">
          <ExclamationMark />
          <Information.Title>거래참여 이력이 없습니다.</Information.Title>
          <Information.Contents>
            네고시오에서 진행되고 있는 거래를 찾아
            <br />
            온라인으로 바로 가격 흥정을 시작해보세요
          </Information.Contents>
        </div>
      </Information>
      <Button variant="primary" size="medium" tw="mt-5 mx-auto">
        매물 검색하기
      </Button>
    </div>
  );
}
