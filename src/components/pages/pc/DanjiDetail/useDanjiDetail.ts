/* eslint-disable consistent-return */
import { useEffect, useMemo, useState } from 'react';

import { useRouter } from '@/hooks/utils';

import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';

import { ListingDanjiMarker } from '@/hooks/useMapLayout';

export default function useDanjiDetail(
  depth: number,
  danjiID?: number,
  prefetchedData?: { [key: string]: any } | null,
) {
  const router = useRouter(depth);

  const [listingDetailDanjiID, setListingDetailDanjiID] = useState<number>();

  const id = useMemo(() => {
    if (router?.query?.danjiID) {
      return Number(router.query.danjiID);
    }
  }, [router]);

  const { danji, mutate, isLoading } = useAPI_GetDanjiDetail({
    preFetchedData: prefetchedData,
    danjiId: listingDetailDanjiID || id,
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

      if (window?.Negocio?.callbacks?.selectMarker) {
        window.Negocio.callbacks.selectMarker({
          id: `danjiMarker:${danji.danji_id}${danji.type}`,
          lat,
          lng,
          danjiRealestateType: danji.type,
          danjiID: danji.danji_id,
        } as ListingDanjiMarker);
      }
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
