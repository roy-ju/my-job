/* eslint-disable consistent-return */
import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';
import { useAPI_GetDanjiPhotos } from '@/apis/danji/danjiPhotos';
import { useAPI_DanjiRealPricesList } from '@/apis/danji/danjiRealPricesList';
import { useAPI_DanjiRealPricesPyoungList } from '@/apis/danji/danjiRealPricesPyoungList';
import danjiSuggestEligibilityCheck from '@/apis/danji/danjiRecommendation';

import {
  useAPI_DanjiJeonsaerate,
  useAPI_DanjiJeonsaerateSigungu,
  useAPI_DanjiTradeTurnrate,
  useAPI_DanjiTradeTurnrateSigungu,
} from '@/apis/danji/danjiTradeTurnRate';
import { Year } from '@/constants/enums';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useDanjiDetail(depth: number) {
  const router = useRouter(depth);

  const [buyOrRent, setBuyOrRent] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>(Year.Three);

  // 평리스트 API가 처음에 두번 호출되는 것을 방지하기 위한 State
  const [isMutate, setIsMutate] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>();
  const [selectedJeonyongArea, setSelectedJeonyongArea] = useState<string>();
  const [selectedJeonyongAreaMax, setSelectedJeonyongAreaMax] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [isRecommendationService, setIsRecommendationService] = useState(false);
  const [isRealPricesAvailable, setIsRealPricesAvailable] = useState(false);

  const [checked, setChecked] = useState<boolean>();

  const { danji } = useAPI_GetDanjiDetail({
    pnu: router?.query?.p as string,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
  });

  const { danjiPhotos } = useAPI_GetDanjiPhotos({
    pnu: danji?.pnu,
    realestateType: danji?.type,
  });

  const { data: danjiListings, increamentPageNumber } = useAPI_GetDanjiListingsList({
    pnu: danji?.pnu,
    realestateType: danji?.type,
    pageSize: 4,
  });

  const {
    data: danjiRealPricesData,
    list: danjiRealPricesPyoungList,
    isLoading: danjiRealPricesPyoungListLoading,
  } = useAPI_DanjiRealPricesPyoungList({
    pnu: danji?.pnu,
    realestateType: danji?.type,
    buyOrRent: isMutate ? buyOrRent : null,
  });

  const { data: danjiTradeTurnRateData } = useAPI_DanjiTradeTurnrate({
    buyOrRent,
    pnu: danji?.pnu,
    realestateType: danji?.type,
    year: selectedYear,
  });

  const { data: danjiTradeTurnRateSigunguData } = useAPI_DanjiTradeTurnrateSigungu({
    buyOrRent,
    pnu: danji?.pnu,
    realestateType: danji?.type,
    year: selectedYear,
  });

  const { data: danjiJeonsaeRateRateData } = useAPI_DanjiJeonsaerate({
    buyOrRent,
    pnu: danji?.pnu,
    realestateType: danji?.type,
    year: selectedYear,
  });

  const { data: danjiJeonsaeRateSigunguData } = useAPI_DanjiJeonsaerateSigungu({
    buyOrRent,
    pnu: danji?.pnu,
    realestateType: danji?.type,
    year: selectedYear,
  });

  const {
    data: danjiRealPricesListData,
    list: danjiRealPricesList,
    setSize: danjiRealPriesListSetSize,
  } = useAPI_DanjiRealPricesList({
    pnu: danji?.pnu,
    realestateType: danji?.type,
    buyOrRent,
    list: danjiRealPricesPyoungList,
    directDealExcluded: checked || false,
    selectedIndex,
    year: selectedYear,
    ps: 10,
  });

  useEffect(() => {
    if (!danjiRealPricesPyoungListLoading) {
      setIsRealPricesAvailable(Boolean(danjiRealPricesPyoungList?.length));
    }
  }, [danjiRealPricesPyoungList, danjiRealPricesPyoungListLoading]);

  const isShowDanjiPhotos = useMemo(() => {
    if (danjiPhotos && danjiPhotos?.danji_photos && danjiPhotos.danji_photos.length > 0) {
      return true;
    }

    return false;
  }, [danjiPhotos]);

  const onChangeBuyOrRent = useCallback((value: number) => {
    setBuyOrRent(value);
    setIsMutate(true);
  }, []);

  const onChangeChecked = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  const onChangeSelectedYear = useCallback((value: number) => {
    setSelectedYear(value);
  }, []);

  const onChangeSelectedArea = useCallback((val: string) => {
    setSelectedArea(val);
  }, []);

  const onChangeSelectedJeonyongArea = useCallback((val: string) => {
    setSelectedJeonyongArea(val);
  }, []);

  const onChangeSelectedJeonyongAreaMax = useCallback((val: string) => {
    setSelectedJeonyongAreaMax(val);
  }, []);

  const onChangeSelectedIndex = useCallback((val: number) => {
    setSelectedIndex(val);
  }, []);

  const handleListingAll = useCallback(() => {
    router.push(Routes.DanjiListings, { searchParams: { p: `${router.query.p}`, rt: router.query.rt as string } });
  }, [router]);

  const handleRecommendation = useCallback(() => {
    router.push(Routes.DanjiRecommendation, {
      searchParams: { p: `${router.query.p}`, rt: router.query.rt as string },
    });
  }, [router]);

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

    if (selectedArea) {
      sessionStorage.setItem('d-gr', selectedArea.toString());
    } else if (!selectedArea) {
      sessionStorage.removeItem('d-gr');
    }

    if (selectedJeonyongArea) {
      sessionStorage.setItem('d-jr-s', selectedJeonyongArea.toString());
    } else if (!selectedJeonyongArea) {
      sessionStorage.removeItem('d-jr-s');
    }

    if (selectedJeonyongAreaMax) {
      sessionStorage.setItem('d-jr-m', selectedJeonyongAreaMax.toString());
    } else if (!selectedJeonyongAreaMax) {
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

    router.push(Routes.DanjiRealPriceList, {
      searchParams: { p: `${router.query.p}`, rt: router.query.rt as string },
      state: {},
    });
  }, [
    buyOrRent,
    checked,
    danjiRealPricesPyoungList,
    router,
    selectedArea,
    selectedIndex,
    selectedJeonyongArea,
    selectedJeonyongAreaMax,
    selectedYear,
  ]);

  const handlePhotos = useCallback(() => {
    router.push(Routes.DanjiPhotos, { searchParams: { p: `${router.query.p}`, rt: router.query.rt as string } });
  }, [router]);

  const navigateToListingDetail = useCallback(
    (id: number) => {
      router.push(Routes.ListingDetail, {
        searchParams: { listingID: `${id}`, p: router.query.p as string, rt: router.query.rt as string },
      });
    },
    [router],
  );

  useEffect(() => {
    async function isAccessible(code: string) {
      const response = await danjiSuggestEligibilityCheck(code);

      if (response && response.eligible) {
        setIsRecommendationService(true);
      } else if (response && !response.eligible) {
        setIsRecommendationService(false);
      }
    }

    if (danji && danji.bubjungdong_code) {
      isAccessible(danji.bubjungdong_code);
    }
  }, [danji]);

  useEffect(() => {
    if (danjiRealPricesData && danjiRealPricesData.buy_or_rent) {
      setBuyOrRent(danjiRealPricesData.buy_or_rent);
    }
  }, [danjiRealPricesData]);

  useEffect(() => {
    if (danjiRealPricesPyoungList && danjiRealPricesPyoungList.length > 0) {
      const index = danjiRealPricesPyoungList.findIndex((ele) => ele.default === true);
      setSelectedArea(danjiRealPricesPyoungList[index]?.gonggeup_pyoung.toString());
      setSelectedJeonyongArea(danjiRealPricesPyoungList[index]?.min_jeonyong.toString());
      setSelectedJeonyongAreaMax(danjiRealPricesPyoungList[index]?.max_jeonyong.toString());
      setSelectedIndex(index);
      setBuyOrRent(danjiRealPricesData?.buy_or_rent);
    }
  }, [danjiRealPricesData?.buy_or_rent, danjiRealPricesPyoungList, danjiRealPricesPyoungListLoading]);

  return useMemo(
    () => ({
      isRealPricesAvailable,
      danji,
      danjiPhotos,
      danjiListings,
      danjiRealPricesData,
      danjiRealPricesPyoungList,
      danjiTradeTurnRateData,
      danjiTradeTurnRateSigunguData,
      danjiJeonsaeRateRateData,
      danjiJeonsaeRateSigunguData,
      buyOrRent,
      selectedYear,
      isShowDanjiPhotos,
      selectedArea,
      selectedJeonyongArea,
      selectedJeonyongAreaMax,
      selectedIndex,
      checked,
      danjiRealPricesListData,
      danjiRealPricesList,
      isRecommendationService,
      handleRecommendation,
      handleRealPriceList,
      handlePhotos,
      handleListingAll,
      danjiRealPriesListSetSize,
      onChangeChecked,
      onChangeBuyOrRent,
      onChangeSelectedYear,
      onChangeSelectedArea,
      onChangeSelectedJeonyongArea,
      onChangeSelectedJeonyongAreaMax,
      onChangeSelectedIndex,
      increamentPageNumber,
      navigateToListingDetail,
    }),
    [
      isRealPricesAvailable,
      danji,
      danjiPhotos,
      danjiListings,
      danjiRealPricesData,
      danjiRealPricesPyoungList,
      danjiTradeTurnRateData,
      danjiTradeTurnRateSigunguData,
      danjiJeonsaeRateRateData,
      danjiJeonsaeRateSigunguData,
      buyOrRent,
      selectedYear,
      isShowDanjiPhotos,
      selectedArea,
      selectedJeonyongArea,
      selectedJeonyongAreaMax,
      selectedIndex,
      checked,
      danjiRealPricesListData,
      danjiRealPricesList,
      isRecommendationService,
      handleRecommendation,
      handleRealPriceList,
      handlePhotos,
      handleListingAll,
      onChangeChecked,
      onChangeBuyOrRent,
      onChangeSelectedYear,
      onChangeSelectedArea,
      onChangeSelectedJeonyongArea,
      onChangeSelectedJeonyongAreaMax,
      onChangeSelectedIndex,
      increamentPageNumber,
      danjiRealPriesListSetSize,
      navigateToListingDetail,
    ],
  );
}
