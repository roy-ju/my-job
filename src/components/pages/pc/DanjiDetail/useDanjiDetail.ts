import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';
import { useAPI_GetDanjiPhotos } from '@/apis/danji/danjiPhotos';
import { useAPI_DanjiRealPricesPyoungList } from '@/apis/danji/danjiRealPricesPyoungList';
import {
  useAPI_DanjiJeonsaerate,
  useAPI_DanjiJeonsaerateSigungu,
  useAPI_DanjiTradeTurnrate,
  useAPI_DanjiTradeTurnrateSigungu,
} from '@/apis/danji/danjiTradeTurnRate';
import { Year } from '@/constants/enums';
import { useRouter } from '@/hooks/utils';
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

  const { data: danjiRealPricesData, list: danjiRealPricesPyoungList } = useAPI_DanjiRealPricesPyoungList({
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

  useEffect(() => {
    if (danjiRealPricesData && danjiRealPricesData.buy_or_rent) {
      setBuyOrRent(danjiRealPricesData.buy_or_rent);
    }
  }, [danjiRealPricesData]);

  return useMemo(
    () => ({
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
      onChangeBuyOrRent,
      onChangeSelectedYear,
      onChangeSelectedArea,
      onChangeSelectedJeonyongArea,
      onChangeSelectedJeonyongAreaMax,
      onChangeSelectedIndex,
      increamentPageNumber,
    }),
    [
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
      onChangeBuyOrRent,
      onChangeSelectedYear,
      onChangeSelectedArea,
      onChangeSelectedJeonyongArea,
      onChangeSelectedJeonyongAreaMax,
      onChangeSelectedIndex,
      increamentPageNumber,
    ],
  );
}
