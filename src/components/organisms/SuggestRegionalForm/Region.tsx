import { Button } from '@/components/atoms';

export interface RegionProps {
  region?: string;
  onClickOpenRegionList?: () => void;
}

export default function Region({ region, onClickOpenRegionList }: RegionProps) {
  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold mb-1">어느 지역 매물을 추천받고 싶은지 선택해 주세요</div>
        <div tw="text-info text-gray-700">추천은 법정동을 기준으로 합니다.</div>
      </div>
      {region && <div tw="font-bold mb-4">선택한 지역: {region}</div>}
      <Button tw="w-full" variant="outlined" size="bigger" onClick={onClickOpenRegionList}>
        지역 선택
      </Button>
    </div>
  );
}
