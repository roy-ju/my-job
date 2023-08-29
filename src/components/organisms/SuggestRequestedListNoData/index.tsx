import { Button } from '@/components/atoms';
import ExclamationMarkIcon from '@/assets/icons/exclamation_mark.svg';

export default function SuggestRequestedListNoData({ onClick }: { onClick?: () => void }) {
  return (
    <div tw="flex flex-col items-center justify-center">
      <ExclamationMarkIcon tw="mb-3" />
      <div tw="text-h2 leading-none text-gray-1000 font-bold text-center mb-4">구하는 글이 없습니다.</div>
      <div tw="text-info text-gray-700 mb-5">구하기 글을 작성하고 원하는 곳의 매물을 추천받아보세요.</div>
      <Button size="medium" onClick={onClick}>
        새로운 매물 구하기
      </Button>
    </div>
  );
}
