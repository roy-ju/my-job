import updateBidding from '@/apis/bidding/updateBidding';
import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import { Loading, MobileContainer } from '@/components/atoms';
import { BiddingSummary } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

export default memo(() => {
  const router = useRouter();
  const listingID = Number(router.query.listingID) ?? 0;

  const { data, isLoading } = useAPI_GetListingDetail(listingID);

  const [isUpdatingBidding, setIsUpdatingBidding] = useState(false);

  const params = useMemo(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const handleClickNext = useCallback(async () => {
    setIsUpdatingBidding(true);

    await updateBidding({ ...params });

    setIsUpdatingBidding(false);

    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.UpdateBiddingSuccess}`,
      query: {
        listingID: router.query.listingID,
        biddingID: router.query.biddingID,
      },
    });
  }, [router, params]);

  const handleClickBack = useCallback(() => {
    router.replace(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.UpdateBiddingForm}`,
        query: {
          listingID: router.query.listingID,
          biddingID: router.query.biddingID,
          params: router.query.params,
        },
      },
      `/${Routes.EntryMobile}/${Routes.UpdateBiddingForm}?listingID=${router.query.listingID}&biddingID=${router.query.biddingID}`,
    );
  }, [router]);

  useEffect(() => {
    if (!params) router.back();
  }, [router, params]);

  return (
    <MobileContainer>
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
          contractAmount={params?.contract_amount}
          interimAmount={params?.interim_amount}
          remainingAmountDate={params?.remaining_amount_payment_time}
          remainingAmountDateType={params?.remaining_amount_payment_time_type}
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
    </MobileContainer>
  );
});
