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

      {region && (
        <div tw="flex flex-row items-center justify-between">
          <div tw="font-bold">선택한 지역: {region}</div>{' '}
          <Button variant="primary" size="small" onClick={onClickOpenRegionList} tw="max-w-[96px] min-h-[36px]">
            지역 재선택
          </Button>
        </div>
      )}

      {!region && (
        <Button tw="w-full" variant="outlined" size="bigger" onClick={onClickOpenRegionList}>
          지역 선택
        </Button>
      )}
      <div tw="text-info text-gray-700 mt-4">
        특정 단지의 매물만 추천받기 원하시면 지도에서 특정단지 선택하신 후 추천받기하실 수 도 있습니다.
      </div>
    </div>
  );
}
