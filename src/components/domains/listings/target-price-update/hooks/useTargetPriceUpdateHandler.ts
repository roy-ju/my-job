import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

import Routes from '@/router/routes';

export default function useTargetPriceUpdateHandler() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const listingID = Number(router.query.listingID) ?? 0;

  const { data } = useFetchListingDetail(listingID);

  const [price, setPrice] = useState('');

  const [monthlyRentFee, setMonthlyRentFee] = useState('');

  const handleNext = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        router.replace({
          pathname: `/${depth1}/${Routes.ListingTargetPriceUpdateSummary}`,
          query: {
            ...query,
            listingID: router.query.listingID as string,
            price: `${convertPriceInputToNumber(price)}`,
            monthlyRentFee: `${convertPriceInputToNumber(monthlyRentFee)}`,
          },
        });
      } else {
        router.replace({
          pathname: `/${Routes.ListingTargetPriceUpdateSummary}`,
          query: {
            ...query,
            listingID: router.query.listingID as string,
            price: `${convertPriceInputToNumber(price)}`,
            monthlyRentFee: `${convertPriceInputToNumber(monthlyRentFee)}`,
          },
        });
      }
    } else {
      router.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.ListingTargetPriceUpdateSummary}`,
        query: {
          listingID: router.query.listingID,
          price: `${convertPriceInputToNumber(price)}`,
          monthlyRentFee: `${convertPriceInputToNumber(monthlyRentFee)}`,
        },
      });
    }
  }, [platform, router, price, monthlyRentFee]);

  const handleClickBack = useCallback(() => router.back(), [router]);

  return { data, platform, price, monthlyRentFee, setPrice, setMonthlyRentFee, handleNext, handleClickBack };
}
