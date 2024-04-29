import { memo, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { MobileContainer } from '@/components/atoms';

import { ListingTargetPriceUpdateSummary } from '@/components/templates';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

import { apiService } from '@/services';

import Routes from '@/router/routes';

export default memo(() => {
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

    await router.back();
    toast.success('희망가를 수정했습니다.');
  }, [router, mutate, afterPrice, afterMonthlyRentFee, listingID]);

  return (
    <MobileContainer>
      <ListingTargetPriceUpdateSummary
        beforeMonthlyRentFee={data?.monthly_rent_fee}
        beforePrice={data?.trade_or_deposit_price}
        afterMonthlyRentFee={afterMonthlyRentFee}
        afterPrice={afterPrice}
        isUpdating={isUpdating}
        onClickBack={() =>
          router.replace(`/${Routes.EntryMobile}/${Routes.ListingTargetPriceUpdate}?listingID=${listingID}`)
        }
        onClickCancel={() => router.back()}
        onClickSubmit={handleClickNext}
      />
    </MobileContainer>
  );
});
