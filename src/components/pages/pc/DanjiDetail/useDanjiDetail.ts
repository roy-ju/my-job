/* eslint-disable consistent-return */
import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useRouter } from '@/hooks/utils';
import { ListingDanjiMarker } from '@/layouts/MapLayout/useMapLayout';
import { useEffect, useMemo, useState } from 'react';

export default function useDanjiDetail(depth: number, danjiID?: number) {
  const router = useRouter(depth);

  const [listingDetailDanjiID, setListingDetailDanjiID] = useState<number>();

  const { danji, mutate, isLoading } = useAPI_GetDanjiDetail({
    danjiId: listingDetailDanjiID || router.query.danjiID ? Number(router.query.danjiID) : undefined,
  });

  useEffect(() => {
    if (danjiID) {
      setListingDetailDanjiID(danjiID);
    }
  }, [danjiID, router]);

  useEffect(() => {
    const lat = danji?.lat;
    const lng = danji?.long;

    if (lat && lng) {
      const isListingDetailOpen = window.location.pathname.includes('listingDetail');

      if (isListingDetailOpen) return;

      window.Negocio.callbacks.selectMarker({
        id: `danjiMarker:${danji.danji_id}${danji.type}`,
        lat,
        lng,
        danjiRealestateType: danji.type,
        danjiID: danji.danji_id,
      } as ListingDanjiMarker);
    }
  }, [danji]);

  return useMemo(
    () => ({
      danji,
      mutate,
      isLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [danji, mutate, isLoading, router],
  );
}
