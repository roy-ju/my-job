import { GetDanjiRealPricesPyoungListResponse } from '@/apis/danji/danjiRealPricesPyoungList';

export default function RealPricesPyoungList({
  danjiRealPricesPyoungList,
}: {
  danjiRealPricesPyoungList?: GetDanjiRealPricesPyoungListResponse['list'];
}) {
  if (!danjiRealPricesPyoungList) return null;

  return danjiRealPricesPyoungList?.length > 0 ? (
    <div tw="px-5 mt-10">
      <div tw="mb-3">
        <span tw="text-b1 font-bold [line-height: 1.25rem] [letter-spacing: -0.4px]">평형별 실거래 내역</span>
      </div>
      <div>
        {danjiRealPricesPyoungList.map((item) => (
          <div key={item.avg_jeonyong} />
        ))}
      </div>
    </div>
  ) : null;
}
