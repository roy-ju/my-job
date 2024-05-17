import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

import { apiService } from '@/services';

import Routes from '@/router/routes';

export default function useTargetPriceUpdateSummaryHandler() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const listingID = Number(router.query.listingID) ?? 0;

  const afterPrice = Number(router.query.price) ?? 0;

  const afterMonthlyRentFee = Number(router.query.monthlyRentFee) ?? 0;

  const { data, mutate } = useFetchListingDetail(listingID);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleClickNext = useCallback(async () => {
    setIsUpdating(true);

    await apiService.listingSellerTargetPriceUpdate({
      listing_id: listingID,
      trade_or_deposit_price: afterPrice,
      monthly_rent_fee: afterMonthlyRentFee,
    });

    await mutate();

    setIsUpdating(false);

    toast.success('희망가를 수정했습니다.');

    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        router.replace({
          pathname: `/${depth1}`,
          query: {
            ...query,
          },
        });
      } else {
        router.replace({
          pathname: `/`,
          query: {
            ...query,
          },
        });
      }
    } else {
      await router.back();
    }
  }, [listingID, afterPrice, afterMonthlyRentFee, mutate, platform, router]);

  const handleClickBack = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        router.replace({
          pathname: `/${depth1}/${Routes.ListingTargetPriceUpdate}`,
          query: {
            ...query,
          },
        });
      } else {
        router.replace({
          pathname: `/${Routes.ListingTargetPriceUpdate}`,
          query: {
            ...query,
          },
        });
      }
    } else {
      router.replace(`/${Routes.EntryMobile}/${Routes.ListingTargetPriceUpdate}?listingID=${listingID}`);
    }
  }, [listingID, platform, router]);

  const handleClickCancel = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        router.replace({
          pathname: `/${depth1}`,
          query: {
            ...query,
          },
        });
      } else {
        router.replace({
          pathname: `/`,
          query: {
            ...query,
          },
        });
      }
    } else {
      router.back();
    }
  }, [platform, router]);

  return { data, isUpdating, afterMonthlyRentFee, afterPrice, handleClickNext, handleClickBack, handleClickCancel };
}
