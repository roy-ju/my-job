/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

export default function useDanjiDetail(danjiID?: number, rt?: number) {
  const router = useRouter();

  const [listingDetailDanjiID, setListingDetailDanjiID] = useState<number>();
  const [listingDetailRt, setListingDetailRt] = useState<number>();

  const { danji, mutate, isLoading } = useAPI_GetDanjiDetail({
    danjiId: Number(listingDetailDanjiID || router?.query?.danjiID),
    realestateType: listingDetailRt || (router?.query?.rt ? Number(router.query.rt) : undefined),
  });

  useEffect(() => {
    if (danji) {
      setListingDetailDanjiID(danjiID);
    }
  }, [danjiID]);

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
