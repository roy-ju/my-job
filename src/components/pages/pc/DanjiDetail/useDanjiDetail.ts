/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useRouter } from '@/hooks/utils';
import { ListingDanjiMarker } from '@/layouts/MapLayout/useMapLayout';
import { useEffect, useMemo, useState } from 'react';

export default function useDanjiDetail(depth: number, p?: string, rt?: number) {
  const router = useRouter(depth);

  const [listingDetailPnu, setListingDetailPnu] = useState<string>();
  const [listingDetailRt, setListingDetailRt] = useState<number>();

  const { danji, mutate, isLoading } = useAPI_GetDanjiDetail({
    pnu: listingDetailPnu || (router?.query?.p as string),
    realestateType: listingDetailRt || (router?.query?.rt ? Number(router.query.rt) : undefined),
  });

  useEffect(() => {
    if (p) {
      setListingDetailPnu(p);
    }
  }, [p]);

  useEffect(() => {
    if (rt) {
      setListingDetailRt(rt);
    }
  }, [rt]);

  useEffect(() => {
    const lat = danji?.lat;
    const lng = danji?.long;
    if (lat && lng) {
      const isListingDetailOpen = window.location.pathname.includes('listingDetail');
      if (isListingDetailOpen) return;

      window.Negocio.callbacks.selectMarker({
        id: `danjiMarker:${danji.pnu}${danji.type}`,
        lat,
        lng,
        danjiRealestateType: danji.type,
        pnu: danji.pnu,
      } as ListingDanjiMarker);
    }
  }, [danji]);

  return useMemo(
    () => ({
      danji,
      mutate,
      isLoading,
    }),
    [danji, mutate, isLoading],
  );
}
