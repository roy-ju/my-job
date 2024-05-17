import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Loading, Panel } from '@/components/atoms';

import { BiddingSummary } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;

  const { data, isLoading } = useFetchListingDetail(listingID);

  const [isUpdatingBidding, setIsUpdatingBidding] = useState(false);

  const params = useMemo(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const handleClickNext = useCallback(async () => {
    setIsUpdatingBidding(true);

    await apiService.updateBidding({ ...params });

    setIsUpdatingBidding(false);

    router.replace(Routes.UpdateBiddingSuccess, {
      searchParams: { listingID: router.query.listingID as string, biddingID: router.query.biddingID as string },
    });
  }, [router, params]);

  const handleClickBack = useCallback(() => {
    router.replace(Routes.UpdateBiddingForm, {
      searchParams: { listingID: router.query.listingID as string, biddingID: router.query.biddingID as string },
      state: { params: router.query.params as string },
    });
  }, [router]);

  useEffect(() => {
    if (!params) router.pop();
  }, [router, params]);

  return (
    <Panel width={panelWidth}>
      {isLoading ? (
        <div tw="py-20">
          <Loading />
        </div>
      ) : (
        <BiddingSummary
          listingTitle={data?.listing?.listing_title}
          address={data?.display_address}
          area={data?.listing?.jeonyong_area}
          floorDescription={data?.listing?.floor_description}
          floor={data?.listing?.floor}
          direction={data?.listing?.direction}
          listingPrice={data?.trade_or_deposit_price}
          listingMonthlyRentFee={data?.monthly_rent_fee}
          listingBuyOrRent={data?.listing?.buy_or_rent}
          acceptingTargetPrice={params?.accepting_target_price}
          price={params?.bidding_trade_or_deposit_price}
          monthlyRentFee={params?.bidding_monthly_rent_fee}
          moveInDate={params?.move_in_date}
          moveInDateType={params?.move_in_date_type}
          etcs={params?.etcs}
          description={params?.description}
          isCreatingBidding={isUpdatingBidding}
          buttonText="수정"
          onClickBack={handleClickBack}
          onClickNext={handleClickNext}
        />
      )}
    </Panel>
  );
});
