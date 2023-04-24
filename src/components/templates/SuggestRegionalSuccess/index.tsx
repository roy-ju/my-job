import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';

interface Props {
  onClickNext?: () => void;
}

export default function SuggestRegionalSummary({ onClickNext }: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>지역 매물 추천받기</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="py-7 px-5">
          <div tw="font-bold mb-1">중개사님들에게 지역 매물 추천을 요청했습니다.</div>
          <div tw="text-info text-gray-700 mb-2">중개사님의 매물 추천을 기다려 주세요</div>
          <div tw="text-info text-gray-700">요청 내용 확인은 마이페이지에서 할 수 있습니다.</div>
        </div>
      </div>
      <PersistentBottomBar>
        <Button tw="w-full" size="bigger" onClick={onClickNext}>
          확인
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
