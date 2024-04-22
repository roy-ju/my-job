import { MarginTopTwelve } from '@/components/atoms/Margin';

export default function SuggestStopped() {
  return (
    <div tw="py-2">
      <div tw="flex items-center h-9">
        <div tw="text-heading_01">인터뷰가 중단되었어요!</div>
      </div>
      <MarginTopTwelve />
      <div tw="whitespace-pre-line text-body_01 text-gray-700">{`구해요 요청이 중단되었습니다. 요청을 재개하여 인터뷰를 진행하고 집을 추천받아보세요. 요청 재개를 원하시면 ‘관리 > 요청 재개’를 클릭하여 중단된 요청을 재개할 수 있습니다.`}</div>
    </div>
  );
}
