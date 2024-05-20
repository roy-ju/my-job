/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

export default function useDanjiDetailMobile(danjiID?: number, prefetchedData?: { [key: string]: any } | null) {
  const router = useRouter();

  const [listingDetailDanjiID, setListingDetailDanjiID] = useState<number>();

  const { danji, mutate, isLoading } = useAPI_GetDanjiDetail({
    preFetchedData: prefetchedData,
    danjiId: Number(listingDetailDanjiID || router?.query?.danjiID),
  });

  useEffect(() => {
    if (danjiID) {
      setListingDetailDanjiID(danjiID);
    }
  }, [danjiID]);

  return useMemo(
    () => ({
      danji,
      mutate,
      isLoading,
    }),
    [danji, mutate, isLoading],
  );
}
