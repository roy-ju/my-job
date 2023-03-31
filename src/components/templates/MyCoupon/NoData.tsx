import { Information } from '@/components/molecules/Information';
import ExclamationMark from '@/assets/icons/exclamation_mark.svg';

export default function NoData() {
  return (
    <Information>
      <div tw="flex flex-col gap-4 items-center text-center">
        <ExclamationMark />
        <Information.Title>발행된 쿠폰이 없습니다.</Information.Title>
      </div>
    </Information>
  );
}
