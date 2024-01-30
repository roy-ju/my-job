import { Button, Checkbox, Label, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { useState } from 'react';

interface Props {
  canReceiveSuggest?: boolean;
  isCreatingSuggest?: boolean;
  onClickNext?: (receiveSuggest: boolean) => void;
}

export default function BiddingSuccess({ canReceiveSuggest = false, isCreatingSuggest, onClickNext }: Props) {
  const [receiveSuggest, setReceiveSuggest] = useState(false);

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>가격제안</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="px-5 py-7">
          <div tw="font-bold mb-1">가격제안을 완료했습니다.</div>
          <div tw="text-info text-gray-700">제안가와 추가 조건에 대한 중개사님의 회신을 기다려 주세요.</div>
        </div>
        {canReceiveSuggest && (
          <div>
            <Separator />
            <div tw="py-7">
              <div tw="font-bold mb-1 px-5">
                비슷한 가격으로 거래할 수 있는
                <br />
                다른 매물도 추천 받으시겠습니까?
              </div>
              <div tw="text-info text-gray-700 mb-3 px-5">
                최소 10명의 중개사님이 주변지역에서 숨은매물을 추천해 드려요.
              </div>
              <div tw="pl-5">
                <Label
                  control={<Checkbox />}
                  label="매물에 거래제안하고 이 가격대의 다른 매물을 추천받을래요"
                  checked={receiveSuggest}
                  onChange={(e) => setReceiveSuggest(e.target.checked)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <PersistentBottomBar>
        <Button isLoading={isCreatingSuggest} tw="w-full" size="bigger" onClick={() => onClickNext?.(receiveSuggest)}>
          확인
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
