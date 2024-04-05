import { useCallback, memo } from 'react';

import Routes from '@/router/routes';

import { useRouter } from 'next/router';

import { DanjiRealPricesPyoungListResponse } from '@/services/danji/types';

import { useFetchDanjiRealPricesList } from '@/services/danji/useFetchDanjiRealPricesList';

import MoreButton from './MoreButton';

import List from './List';

import { CommonDanjiDetailProps } from '../types';

import { FullWidth, ListContainer, ListTitle, ListWrraper } from './widget/RealpriceWidget';

interface RealPricesListProps extends CommonDanjiDetailProps {
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
}

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
}: RealPricesListProps) {
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
    <ListContainer>
      <FullWidth>
        <div>
          <ListWrraper>
            <ListTitle tw="min-w-[4.375rem] [text-align: left]">계약일</ListTitle>
            <ListTitle tw="min-w-[3.5rem] [text-align: right]">거래</ListTitle>
            <ListTitle tw="min-w-[3.5rem] [text-align: right]">층수</ListTitle>
            <ListTitle tw="min-w-[9.625rem] [text-align: right]">실거래가</ListTitle>
          </ListWrraper>
        </div>
        <List realPricesList={realPricesList} isMorePage={isMorePage} onIntersect={onIntersect} />
      </FullWidth>

      {isMorePage
        ? null
        : realPricesList && realPricesList.length > 8 && <MoreButton handleClick={handleRealPriceList} />}
    </ListContainer>
  );
}

export default memo(RealPricesList);
