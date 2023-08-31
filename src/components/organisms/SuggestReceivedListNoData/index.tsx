import { Button } from '@/components/atoms';
import ExclamationMarkIcon from '@/assets/icons/exclamation_mark.svg';

export default function SuggestReceivedListNoData({ onClick }: { onClick?: () => void }) {
  return (
    <div tw="flex flex-col items-center justify-center">
      <ExclamationMarkIcon tw="mb-3" />
      <div tw="text-h2 leading-none text-gray-1000 font-bold text-center mb-4">제안 받은 내용이 없습니다.</div>
      <div tw="text-info text-gray-700 mb-5">집주인과 중개사의 제안을 기다려 주세요.</div>
      <Button onClick={onClick} size="medium">
        새로운 매물 구하기
      </Button>
    </div>
  );
}
