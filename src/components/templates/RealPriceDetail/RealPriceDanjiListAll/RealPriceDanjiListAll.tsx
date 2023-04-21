import { BuyOrRent, describeBuyOrRent } from '@/constants/enums';
import tw from 'twin.macro';

import TradeIcon from '@/assets/icons/trade.svg';
import { customAlphabet } from 'nanoid';
import { useCallback, useState } from 'react';
import { useAPI_DanjiRealPricesPyoungList } from '@/apis/danji/danjiRealPricesPyoungList';
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_ThisDanjiRecentlyRealPricesListAll } from '@/apis/danji/danjiRecentlyListAll';
import { formatNumberInKorean } from '@/utils';
import { Button, Checkbox } from '@/components/atoms';
import { minDigits } from '@/utils/fotmat';

const CharTableHeaderList = [
  { title: '계약일', width: '67px', textAlign: 'left' },
  { title: '거래', width: '48px', textAlign: 'right' },
  { title: '층수', width: '56px', textAlign: 'right' },
  { title: '평형', width: '56px', textAlign: 'right' },
  { title: '실거래가', width: '103px', textAlign: 'right' },
];

const StyledTableTypography = tw.span`text-b2 [letter-spacing: -0.4px] text-gray-1000`;

const ChartTableHeader = ({ title, width, textAlign = 'left' }: { title: string; width: string; textAlign?: any }) => (
  <div style={{ width, textAlign }}>
    <StyledTableTypography>{title}</StyledTableTypography>
  </div>
);

export default function RealPriceDanjiListAll({
  danji,
  buyOrRent,
}: {
  danji?: GetDanjiDetailResponse;
  buyOrRent?: number;
}) {
  const [checked, setChecked] = useState(false);

  const nanoid = customAlphabet('1234567890abcdefghijk', 10);

  const { isLoading: pyoungLoading, data } = useAPI_DanjiRealPricesPyoungList({
    pnu: danji?.pnu,
    realestateType: danji?.type,
    buyOrRent,
  });

  const { isLoading, list, isShowMoreButton, setSize } = useAPI_ThisDanjiRecentlyRealPricesListAll({
    res: data,
    pnu: danji?.pnu,
    realestateType: danji?.type,
    buyOrRent,
    directDealExcluded: checked,
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const priceUtil = useCallback((pr: number, mrf?: number, bor?: number) => {
    if (bor === BuyOrRent.Buy) {
      return formatNumberInKorean(pr);
    }
    if (bor === BuyOrRent.Jeonsae) {
      if (typeof mrf === 'number' && mrf > 0) {
        return `${formatNumberInKorean(pr)} /\n${formatNumberInKorean(mrf)}`;
      }
      return formatNumberInKorean(pr);
    }

    if (bor === BuyOrRent.Wolsae && typeof mrf === 'number' && mrf >= 0) {
      return `${formatNumberInKorean(pr)} /\n${formatNumberInKorean(mrf)}`;
    }

    return '-';
  }, []);

  if (pyoungLoading || isLoading) return null;

  return (
    <div tw="py-10 px-5">
      <div tw="flex">
        <span tw="font-bold text-b1 [line-height: 19px]">이 단지 전체 실거래 내역</span>
        {buyOrRent === BuyOrRent.Buy && (
          <div tw="flex flex-row items-center ml-auto gap-2">
            <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <span tw="text-b2 [line-height: 16px]">직거래 제외</span>
          </div>
        )}
      </div>
      <div tw="flex [border-top: 1px solid #E9ECEF] [border-bottom: 1px solid #E9ECEF] py-2 mt-3.5">
        {CharTableHeaderList.map((item) => (
          <ChartTableHeader key={item.title} title={item.title} width={item.width} textAlign={item.textAlign} />
        ))}
      </div>
      {list.length > 0 && (
        <>
          {list.map((item) => (
            <div key={nanoid()} tw="flex [border-bottom: 1px solid #F8F9FA] py-2">
              <div tw="w-[67px] [text-align: left]">
                <span tw="text-b2">
                  {`${(item.year && item.year.slice(2, 4)) || ''}.${minDigits(+item.month, 2)}.${minDigits(
                    +item.day,
                    2,
                  )}`}
                </span>
              </div>
              <div tw="w-[48px] [text-align: right]">
                {item.buy_or_rent === BuyOrRent.Buy && (
                  <span tw="text-b2 text-nego-1000">{describeBuyOrRent(item.buy_or_rent)}</span>
                )}
                {item.buy_or_rent === BuyOrRent.Jeonsae && (
                  <span tw="text-b2 text-red-1100">{describeBuyOrRent(item.buy_or_rent)}</span>
                )}
                {item.buy_or_rent === BuyOrRent.Wolsae && (
                  <span tw="text-b2 text-green-1000">{describeBuyOrRent(item.buy_or_rent)}</span>
                )}
              </div>
              <div tw="w-[56px] [text-align: right]">
                <span tw="text-b2">{`${item.floor}층` || '-'}</span>
              </div>
              <div tw="w-[56px] [text-align: right]">
                <span tw="text-b2">{`${item.pyoung}평` || '-'}</span>
              </div>
              <div tw="flex items-center w-[103px] [text-align: right]">
                {item.buy_or_rent === BuyOrRent.Buy && item.trade_type === '직거래' && (
                  <TradeIcon
                    style={{
                      marginRight: '0.4rem',
                      marginLeft: 'auto',
                    }}
                  />
                )}
                {item.buy_or_rent === BuyOrRent.Buy ? (
                  item.trade_type === '직거래' ? (
                    <span tw="text-b2">{priceUtil(item.price, item.monthly_rent_fee, item.buy_or_rent)}</span>
                  ) : (
                    <span tw="text-b2 w-full">{priceUtil(item.price, item.monthly_rent_fee, item.buy_or_rent)}</span>
                  )
                ) : (
                  <span tw="text-b2 w-full whitespace-pre-wrap">
                    {priceUtil(item.price, item.monthly_rent_fee, item.buy_or_rent)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </>
      )}
      {isShowMoreButton && (
        <Button
          variant="outlined"
          tw="mt-3 w-full"
          onClick={() => {
            setSize((prev) => prev + 1);
          }}
        >
          더보기
        </Button>
      )}
    </div>
  );
}
