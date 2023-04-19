/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_DanjiRecentlyRealPricesListAll } from '@/apis/danji/danjiRecentlyList';
import { Button } from '@/components/atoms';
import { BuyOrRent, describeJeonsaeWolsaeSame } from '@/constants/enums';
import { formatNumberInKorean } from '@/utils';
import { cuttingDot, minDigits } from '@/utils/fotmat';
import { customAlphabet } from 'nanoid';
import { useCallback } from 'react';

const ListItemComponent = ({
  title,
  saedaeCount,
  price,
  area,
  date,
  onClickItem,
}: {
  title: string;
  saedaeCount: string;
  price: string;
  area: string;
  date: string;
  onClickItem: () => void;
}) => (
  <div tw="py-3 [border-bottom: 1px solid #E4E4EF] hover:[background: #F1EEFF]" onClick={onClickItem}>
    <div tw="flex flex-row items-center justify-between mb-1.5">
      <span tw="text-b2 [line-height: 1] max-w-[265px] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
        {title}
      </span>
      <span tw="text-b2 [line-height: 1] text-nego [text-align: center]">{price}</span>
    </div>
    <div tw="flex flex-row items-center">
      <span tw="min-w-[60px] text-info text-gray-700 [line-height: 14px] [text-align: center]">{date}</span>
      <div tw="w-px h-2 bg-gray-300 mx-2" />
      <span tw="min-w-[60px] text-info text-gray-700 [line-height: 14px] [text-align: center]">{area}</span>
      <div tw="w-px h-2 bg-gray-300 mx-2" />
      <span tw="min-w-[60px] text-info text-gray-700 [line-height: 14px]  [text-align: center]">{saedaeCount}</span>
    </div>
  </div>
);

export function RealPriceAllListWrraper({ danji, buyOrRent }: { danji?: GetDanjiDetailResponse; buyOrRent?: number }) {
  const nanoId = customAlphabet('1234567890abcdefgh');

  const { list, isShowMoreButton, setSize } = useAPI_DanjiRecentlyRealPricesListAll({
    pnu: danji?.pnu,
    realestateType: danji?.type ? danji.type : null,
    buyOrRent,
  });

  const priceUtil = useCallback((pr: number, mrf?: number, bor?: number) => {
    if (bor === BuyOrRent.Buy) {
      return formatNumberInKorean(pr);
    }
    if (bor === BuyOrRent.Jeonsae) {
      if (typeof mrf === 'number' && mrf > 0) {
        return `${formatNumberInKorean(pr)} / ${formatNumberInKorean(mrf)}`;
      }
      return formatNumberInKorean(pr);
    }

    if (bor === BuyOrRent.Wolsae && typeof mrf === 'number' && mrf >= 0) {
      return `${formatNumberInKorean(pr)} / ${formatNumberInKorean(mrf)}`;
    }

    return '-';
  }, []);

  return (
    <div tw="py-10 px-5">
      <div tw="mb-5">
        <span tw="font-bold text-b1 [line-height: 19px]">
          {danji?.sido_name} {danji?.sigungu_name} 최근 실거래 리스트 ({describeJeonsaeWolsaeSame(buyOrRent)})
        </span>
      </div>
      {list &&
        list.length > 0 &&
        list.map((item) => (
          <ListItemComponent
            onClickItem={() => {}}
            key={nanoId()}
            title={item.name}
            saedaeCount={item.saedae_count ? `${Number(item.saedae_count).toLocaleString()} 세대` : '- 세대'}
            price={priceUtil(item.price, item.monthly_rent_fee, item.buy_or_rent)}
            area={`전용 ${cuttingDot(item.jeonyong_area)}㎡`}
            date={`${item.year}.${minDigits(+item.month, 2)}.${minDigits(+item.day, 2)}`}
          />
        ))}
      {isShowMoreButton && (
        <div>
          <Button
            variant="outlined"
            tw="mt-4 w-full"
            onClick={() => {
              setSize((prev) => prev + 1);
            }}
          >
            더보기
          </Button>
        </div>
      )}
    </div>
  );
}
