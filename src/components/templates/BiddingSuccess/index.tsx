import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';

interface Props {
  canReceiveSuggest?: boolean;
  onClickNext?: () => void;
}

export default function BiddingSuccess({ canReceiveSuggest = false, onClickNext }: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>가격제안</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="px-5 py-7 border-t border-t-gray-300">
          <div tw="font-bold mb-1">가격제안을 완료했습니다.</div>
          <div tw="text-info text-gray-700">제안가와 추가 조건에 대한 중개사님의 회신을 기다려 주세요.</div>
        </div>
        {canReceiveSuggest && (
          <div>
            <Separator />
            <div tw="py-7 px-5" />
          </div>
        )}
      </div>
      <PersistentBottomBar>
        <Button tw="w-full" size="bigger" onClick={onClickNext}>
          확인
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
