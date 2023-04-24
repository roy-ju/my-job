import { Button } from '@/components/atoms';
import ExclamationMarkIcon from '@/assets/icons/exclamation_mark.svg';

export default function SuggestRequestedListNoData() {
  return (
    <div tw="flex flex-col items-center justify-center">
      <ExclamationMarkIcon tw="mb-3" />
      <div tw="text-h2 leading-none text-gray-1000 font-bold text-center mb-4">추천 요청이 없습니다.</div>
      <div tw="text-info text-gray-700 mb-5">원하는 지역의 매물을 추천받아보세요.</div>
      <Button size="medium">새로운 매물 추천 받아보기</Button>
    </div>
  );
}
