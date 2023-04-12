import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { Tabs } from '@/components/molecules';

interface Props {
  danji?: GetDanjiDetailResponse;
  onClickListingDetail: () => void;
}

export default function DanjiDetail({ danji, onClickListingDetail }: Props) {
  if (!danji) return null;

  return (
    <div tw="flex flex-col h-full">
      <p>단지상세</p>
      <div tw="flex flex-col gap-y-1">
        <Tabs>
          <Tabs.Tab value={0}>거래정보</Tabs.Tab>
          <Tabs.Tab value={1}>단지정보</Tabs.Tab>
          <Tabs.Tab value={2}>거래정보</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs>

        <button
          tw="rounded-lg bg-blue-500 py-2 px-4 text-center text-white hover:bg-blue-700"
          type="button"
          onClick={onClickListingDetail}
        >
          메물상세로 이동 id 1
        </button>
      </div>
    </div>
  );
}
