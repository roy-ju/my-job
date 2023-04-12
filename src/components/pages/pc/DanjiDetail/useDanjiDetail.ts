import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';
import { useAPI_GetDanjiPhotos } from '@/apis/danji/danjiPhotos';
import { useRouter } from '@/hooks/utils';
import { useMemo } from 'react';

export default function useDanjiDetail(depth: number) {
  const router = useRouter(depth);

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

  const isShowDanjiPhotos = useMemo(() => {
    if (danjiPhotos && danjiPhotos?.danji_photos && danjiPhotos.danji_photos.length > 0) {
      return true;
    }

    return false;
  }, [danjiPhotos]);

  return useMemo(
    () => ({
      danji,
      danjiPhotos,
      isShowDanjiPhotos,
      danjiListings,
      increamentPageNumber,
    }),
    [danji, danjiListings, danjiPhotos, increamentPageNumber, isShowDanjiPhotos],
  );
}
