import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { Button } from '@/components/atoms';

export default function AroundInfo({ danji }: { danji?: GetDanjiDetailResponse }) {
  if (!danji) return null;

  return (
    <div tw="w-full pt-10 pb-10 px-5">
      <div tw="flex w-full justify-between items-center mb-2">
        <span tw="font-bold text-b1 [line-height: 1]">교통 및 주변정보</span>
        <Button
          size="small"
          variant="outlined"
          // selected={selectedHakgudo}
          // onClick={() => {
          //   setSelectedHakgudo((prev) => !prev);
          // }}
        >
          정보보기
        </Button>
      </div>
    </div>
  );
}
