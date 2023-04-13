import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';
import { useAPI_GetDanjiPhotos } from '@/apis/danji/danjiPhotos';
import { useAPI_DanjiRealPricesPyoungList } from '@/apis/danji/danjiRealPricesPyoungList';
import { Year } from '@/constants/enums';
import { useRouter } from '@/hooks/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useDanjiDetail(depth: number) {
  const router = useRouter(depth);

  const [buyOrRent, setBuyOrRent] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>(Year.Three);

  // 평리스트 API가 처음에 두번 호출되는 것을 방지하기 위한 State
  const [isMutate, setIsMutate] = useState(false);

  const { danji } = useAPI_GetDanjiDetail({
    pnu: router?.query?.p as string,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
  });

  const { danjiPhotos } = useAPI_GetDanjiPhotos({
    pnu: router?.query?.p as string,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
  });

  const { data: danjiListings, increamentPageNumber } = useAPI_GetDanjiListingsList({
    pnu: router?.query?.p as string,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
    pageSize: 4,
  });

  const { data: danjiRealPricesData, list: danjiRealPricesPyoungList } = useAPI_DanjiRealPricesPyoungList({
    pnu: router?.query?.p as string,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
    buyOrRent: isMutate ? buyOrRent : null,
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
      buyOrRent,
      selectedYear,
      isShowDanjiPhotos,
      onChangeBuyOrRent,
      onChangeSelectedYear,
      increamentPageNumber,
    }),
    [
      danji,
      danjiListings,
      danjiPhotos,
      danjiRealPricesData,
      danjiRealPricesPyoungList,
      buyOrRent,
      selectedYear,
      isShowDanjiPhotos,
      onChangeBuyOrRent,
      onChangeSelectedYear,
      increamentPageNumber,
    ],
  );
}
