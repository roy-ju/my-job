import { useAPI_DanjiRealPricesList } from '@/apis/danji/danjiRealPricesList';
import { customAlphabet } from 'nanoid';
import TradeIcon from '@/assets/icons/trade.svg';
import { BuyOrRent, describeBuyOrRent } from '@/constants/enums';
import { useCallback } from 'react';
import { formatNumberInKorean } from '@/utils';
import { minDigits } from '@/utils/fotmat';
import { Button, InfiniteScroll } from '@/components/atoms';
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { GetDanjiRealPricesPyoungListResponse } from '@/apis/danji/danjiRealPricesPyoungList';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';

function ChartTableBody({
  title,
  isIcon = false,
  isLeft = false,
  width,
  buyOrRent = 1,
  isSpecialColor = false,
  monthlyRentFee,
}: {
  title: string;
  isIcon?: boolean;
  isLeft?: boolean;
  width: string;
  buyOrRent?: number;
  isSpecialColor?: boolean;
  monthlyRentFee?: number;
}) {
  const getColor = () => {
    if (buyOrRent === BuyOrRent.Buy) {
      return '#5F3DC4';
    }

    if (monthlyRentFee && monthlyRentFee > 0) {
      return '#009F40';
    }

    return '#CA2F0B';
  };

  return isIcon ? (
    <div
      style={{
        width: '100%',
        minWidth: width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'right',
      }}
    >
      <TradeIcon
        style={{
          marginRight: '0.4rem',
          marginLeft: 'auto',
        }}
      />
      <span tw="text-b2 font-normal">{title}</span>
    </div>
  ) : (
    <div
      tw="flex flex-row [text-align: right]"
      style={{ width: '100%', minWidth: width, textAlign: isLeft ? 'left' : 'right' }}
    >
      <span tw="w-full text-b2 font-normal" style={{ color: isSpecialColor ? getColor() : '#212529' }}>
        {title}
      </span>
    </div>
  );
}

export default function RealPricesList({
  danji,
  isMorePage,
  buyOrRent,
  selectedYear,
  selectedGonggeup,
  selectedArea,
  selectedAreaMax,
  checked,
  selectedIndex,
  danjiRealPricesPyoungList,
}: {
  danji?: GetDanjiDetailResponse;
  isMorePage: boolean;
  buyOrRent?: number;
  selectedYear?: number;
  selectedGonggeup?: string;
  selectedArea?: string;
  selectedAreaMax?: string;
  checked: boolean;
  selectedIndex?: number;
  danjiRealPricesPyoungList: GetDanjiRealPricesPyoungListResponse['list'];
}) {
  const router = useRouter();

  const nanoid = customAlphabet('1234567890abcedfg', 10);

  const describeBuyOrRentUtil = (mrf: number, bor: number) => {
    if (mrf > 0) return '월세';
    return describeBuyOrRent(bor);
  };

  const priceUtil = useCallback((pr: number, mrf?: number, bor?: number) => {
    if (bor === BuyOrRent.Buy) {
      return formatNumberInKorean(pr);
    }
    if (bor === BuyOrRent.Jeonsae) {
      if (typeof mrf === 'number' && mrf > 0) {
        return `${formatNumberInKorean(pr)}/${formatNumberInKorean(mrf)}`;
      }
      return formatNumberInKorean(pr);
    }

    if (bor === BuyOrRent.Wolsae && typeof mrf === 'number' && mrf >= 0) {
      return `${formatNumberInKorean(pr)}/${formatNumberInKorean(mrf)}`;
    }

    return '-';
  }, []);

  const { list: realPricesList, setSize } = useAPI_DanjiRealPricesList({
    danjiId: danji?.danji_id,
    realestateType: danji?.type ? Number(danji.type) : null,
    buyOrRent,
    year: selectedYear || 3,
    ps: 10,
    directDealExcluded: checked,
    selectedIndex,
    list: danjiRealPricesPyoungList,
  });

  const handleRealPriceList = useCallback(() => {
    if (buyOrRent) {
      sessionStorage.setItem('d-br', buyOrRent.toString());
    } else if (!buyOrRent) {
      sessionStorage.removeItem('d-br');
    }

    if (selectedYear) {
      sessionStorage.setItem('d-yr', selectedYear.toString());
    } else if (!selectedYear) {
      sessionStorage.removeItem('d-yr');
    }

    if (selectedGonggeup) {
      sessionStorage.setItem('d-gr', selectedGonggeup.toString());
    } else if (!selectedArea) {
      sessionStorage.removeItem('d-gr');
    }

    if (selectedArea) {
      sessionStorage.setItem('d-jr-s', selectedArea.toString());
    } else if (!selectedArea) {
      sessionStorage.removeItem('d-jr-s');
    }

    if (selectedAreaMax) {
      sessionStorage.setItem('d-jr-m', selectedAreaMax.toString());
    } else if (!selectedAreaMax) {
      sessionStorage.removeItem('d-jr-m');
    }

    if (typeof selectedIndex === 'number') {
      sessionStorage.setItem('d-sl-i', selectedIndex.toString());
    } else if (typeof selectedIndex !== 'number') {
      sessionStorage.removeItem('d-sl-i');
    }

    if (danjiRealPricesPyoungList && danjiRealPricesPyoungList.length > 0) {
      sessionStorage.setItem('d-py-l', JSON.stringify(danjiRealPricesPyoungList));
    } else {
      sessionStorage.removeItem('d-py-l');
    }

    if (checked) {
      sessionStorage.setItem('d-ch', '1');
    } else if (!checked) {
      sessionStorage.setItem('d-ch', '2');
    }

    router.push(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiRealPriceList}`,
        query: { danjiID: `${router.query.danjiID}` },
      },
      `/${Routes.EntryMobile}/${Routes.DanjiRealPriceList}?danjiID=${router.query.danjiID}`,
    );
  }, [
    buyOrRent,
    checked,
    danjiRealPricesPyoungList,
    router,
    selectedArea,
    selectedAreaMax,
    selectedGonggeup,
    selectedIndex,
    selectedYear,
  ]);

  const onIntersect = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  if (!realPricesList) return null;
  if (realPricesList && realPricesList.length === 0) return null;

  return (
    <div tw="mt-5 px-5 pb-10">
      <div tw="w-full">
        <div>
          <div tw="flex [border-bottom: 1px solid #E9ECEF] [border-top: 1px solid #E9ECEF]">
            <div tw="w-full min-w-[4.375rem] py-2 text-b2 font-normal [text-align: left] text-gray-700">계약일</div>
            <div tw="w-full min-w-[3.5rem] py-2 text-b2 font-normal [text-align: right] text-gray-700">거래</div>
            <div tw="w-full min-w-[3.5rem] py-2 text-b2 font-normal [text-align: right] text-gray-700">층수</div>
            <div tw="w-full min-w-[9.625rem] py-2 text-b2 font-normal [text-align: right] text-gray-700">실거래가</div>
          </div>
        </div>
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={onIntersect}>
          {realPricesList && realPricesList.length > 0
            ? (isMorePage ? realPricesList : realPricesList.slice(0, 8)).map((item) => (
                <div
                  key={nanoid()}
                  tw="flex flex-row items-center [padding: 8px 0px 8px 0px] [border-bottom: 1px solid #F4F6FA]"
                >
                  <ChartTableBody
                    title={`${(item.year && item.year.slice(2, 4)) || ''}.${minDigits(+item.month, 2)}.${minDigits(
                      +item.day,
                      2,
                    )}`}
                    isLeft
                    width="4.375rem"
                  />
                  <ChartTableBody
                    title={describeBuyOrRentUtil(item.monthly_rent_fee, item.buy_or_rent)}
                    width="3.5rem"
                    isSpecialColor
                    buyOrRent={item.buy_or_rent}
                    monthlyRentFee={item.monthly_rent_fee}
                  />
                  <ChartTableBody title={`${item.floor}층` || '-'} width="3.5rem" />
                  <ChartTableBody
                    isIcon={item.trade_type === '직거래'}
                    title={priceUtil(item.price, item.monthly_rent_fee, item.buy_or_rent)}
                    width="9.625rem"
                  />
                </div>
              ))
            : null}
        </InfiniteScroll>
      </div>
      {isMorePage
        ? null
        : realPricesList &&
          realPricesList.length > 8 && (
            <Button
              variant="outlined"
              tw="w-full mt-3"
              onClick={() => {
                if (handleRealPriceList) {
                  handleRealPriceList();
                }
              }}
            >
              더보기
            </Button>
          )}
    </div>
  );
}
