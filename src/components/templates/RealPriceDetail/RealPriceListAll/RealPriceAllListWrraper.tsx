import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { describeJeonsaeWolsaeSame } from '@/constants/enums';

export function RealPriceAllListWrraper({ danji, buyOrRent }: { danji?: GetDanjiDetailResponse; buyOrRent?: number }) {
  return (
    <div tw="py-10">
      <span tw="font-bold text-b1 [line-height: 19px]">
        {danji?.sido_name} {danji?.sigungu_name} 최근 실거래 리스트 ({describeJeonsaeWolsaeSame(buyOrRent)})
      </span>
    </div>
  );
}
