import { Information } from '@/components/molecules';
import ExclamationMark from '@/assets/icons/exclamation_mark.svg';

export default function NoData() {
  return (
    <div tw="mt-12">
      <Information>
        <div tw="flex flex-col gap-4 items-center text-center">
          <ExclamationMark />
          <Information.Title>네고머니 내역이 없습니다.</Information.Title>
        </div>
      </Information>
    </div>
  );
}
