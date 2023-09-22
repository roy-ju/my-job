import { Button } from '@/components/atoms';

export interface DanjiProps {
  danji?: string;
  onClickOpenDanjiList?: () => void;
}

export default function Danji({ danji, onClickOpenDanjiList }: DanjiProps) {
  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold mb-1">추천 받고 싶은 위치를 선택해 주세요.</div>
        <div tw="text-info text-gray-700">선택한 단지의 매물만 추천받을 수 있어요.</div>
      </div>

      {danji && (
        <div tw="flex flex-row items-center justify-between">
          <div tw="font-bold">선택한 단지: {danji}</div>{' '}
          <Button variant="primary" size="small" onClick={onClickOpenDanjiList} tw="max-w-[96px] min-h-[36px] shrink-0">
            단지 재선택
          </Button>
        </div>
      )}

      {!danji && (
        <Button tw="w-full" variant="primary" size="big" onClick={onClickOpenDanjiList}>
          단지 선택
        </Button>
      )}
    </div>
  );
}
