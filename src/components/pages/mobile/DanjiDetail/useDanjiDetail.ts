/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

export default function useDanjiDetail(p?: string, rt?: number) {
  const router = useRouter();

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

  return useMemo(
    () => ({
      danji,
      mutate,
      isLoading,
    }),
    [danji, mutate, isLoading],
  );
}
