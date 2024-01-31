import { Information } from '@/components/molecules';

import ExclamationMark from '@/assets/icons/exclamation_mark.svg';

export default function NoData() {
  return (
    <Information>
      <div tw="flex flex-col gap-4 items-center text-center">
        <ExclamationMark />
        <Information.Title>서비스 문의가 없습니다.</Information.Title>
        <Information.Contents>
          서비스 이용에 관한 궁금한 점을
          <br />
          네고시오에 직접 물어보세요.
        </Information.Contents>
      </div>
    </Information>
  );
}
