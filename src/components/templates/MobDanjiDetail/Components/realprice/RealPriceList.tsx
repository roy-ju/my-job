import { useCallback, memo } from 'react';

import Routes from '@/router/routes';

import { useRouter } from 'next/router';

import { DanjiDetailResponse, DanjiRealPricesPyoungListResponse } from '@/services/danji/types';

import { useFetchDanjiRealPricesList } from '@/services/danji/useFetchDanjiRealPricesList';

import MoreButton from './MoreButton';

import List from './List';

function RealPricesList({
  danji,
  isMorePage,
  buyOrRent,
  selectedYear,
  selectedGonggeup,
  selectedArea,
  selectedAreaMin,
  selectedAreaMax,
  checked,
  selectedIndex,
  danjiRealPricesPyoungList,
}: {
  danji: DanjiDetailResponse;
  isMorePage: boolean;
  buyOrRent?: number;
  selectedYear?: number;
  selectedGonggeup?: string;
  selectedArea?: string;
  selectedAreaMin?: string;
  selectedAreaMax?: string;
  checked: boolean;
  selectedIndex?: number;
  danjiRealPricesPyoungList: DanjiRealPricesPyoungListResponse['list'];
}) {
  const router = useRouter();

  const { list: realPricesList, setSize } = useFetchDanjiRealPricesList({
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

    if (selectedAreaMin) {
      sessionStorage.setItem('d-jr-min', selectedAreaMin.toString());
    } else if (!selectedAreaMax) {
      sessionStorage.removeItem('d-jr-min');
    }

    if (selectedAreaMax) {
      sessionStorage.setItem('d-jr-max', selectedAreaMax.toString());
    } else if (!selectedAreaMax) {
      sessionStorage.removeItem('d-jr-max');
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
    selectedAreaMin,
    selectedAreaMax,
    selectedGonggeup,
    selectedIndex,
    selectedYear,
  ]);

  const onIntersect = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  if (!realPricesList || (realPricesList && realPricesList.length === 0)) return null;

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
        <List realPricesList={realPricesList} isMorePage={isMorePage} onIntersect={onIntersect} />
      </div>
      {isMorePage
        ? null
        : realPricesList && realPricesList.length > 8 && <MoreButton handleClick={handleRealPriceList} />}
    </div>
  );
}

export default memo(RealPricesList);
