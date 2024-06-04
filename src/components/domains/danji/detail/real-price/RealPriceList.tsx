import { useCallback, memo } from 'react';

import Routes from '@/router/routes';

import { useRouter } from 'next/router';

import { DanjiRealPricesPyoungListResponse } from '@/services/danji/types';

import { useFetchDanjiRealPricesList } from '@/services/danji/useFetchDanjiRealPricesList';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import MoreButton from './MoreButton';

import List from './List';

import { CommonDanjiDetailProps } from '../types';

import { FullWidth, ListContainer, ListTitle, ListWrraper } from './widget/RealpriceWidget';

interface RealPricesListProps extends CommonDanjiDetailProps {
  isSeo?: boolean;
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
  isSeo,
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
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const danjiId = danji?.danji_id;

  const { list: realPricesList, setSize } = useFetchDanjiRealPricesList({
    danjiId,
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

    if (!isSeo && platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      const convertedQuery = {
        ...query,
        ...(router.query.listingID ? { listingID: router.query.listingID as string } : {}),
        danjiID: `${danjiId}`,
        bor: buyOrRent?.toString() || '',
        sl: selectedYear?.toString() || '',
      };

      if (depth1 && depth2) {
        if (depth2 === Routes.DanjiDetail || depth2 === Routes.ListingDetail) {
          router.push({
            pathname: `/${depth2}/${Routes.DanjiRealPriceList}`,
            query: convertedQuery,
          });
        } else {
          router.push({
            pathname: `/${depth1}/${Routes.DanjiRealPriceList}`,
            query: convertedQuery,
          });
        }
      } else if (depth1 && !depth2) {
        router.push({ pathname: `/${depth1}/${Routes.DanjiRealPriceList}`, query: convertedQuery });
      }

      return;
    }

    if (isSeo && platform === 'pc') {
      router.replace(
        {
          pathname: `/${Routes.DanjiDetail}/${Routes.DanjiRealPriceList}`,
          query: { danjiID: `${danjiId}` },
        },
        `/${Routes.DanjiDetail}/${Routes.DanjiRealPriceList}?danjiID=${danjiId}`,
      );

      return;
    }

    router.push(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiRealPriceList}`,
        query: { danjiID: `${danjiId}` },
      },
      `/${Routes.EntryMobile}/${Routes.DanjiRealPriceList}?danjiID=${danjiId}`,
    );
  }, [
    buyOrRent,
    selectedYear,
    selectedGonggeup,
    selectedArea,
    selectedAreaMin,
    selectedAreaMax,
    selectedIndex,
    danjiRealPricesPyoungList,
    checked,
    isSeo,
    platform,
    router,
    danjiId,
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
