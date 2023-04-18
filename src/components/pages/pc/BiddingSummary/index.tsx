import createBidding, { CreateBiddingResponse } from '@/apis/bidding/createBidding';
import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import { Loading, Panel } from '@/components/atoms';
import { BiddingSummary } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useMemo, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;

  const { data, isLoading } = useAPI_GetListingDetail(listingID);

  const { mutate: mutateListing } = useAPI_GetListingDetail(listingID);

  const [isCreatingBidding, setIsCreatingBidding] = useState(false);

  const params = useMemo(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const handleClickNext = useCallback(async () => {
    setIsCreatingBidding(true);
    let res: CreateBiddingResponse | null = null;

    if (!params.accepting_target_price) {
      res = await createBidding({
        listing_id: listingID,
        ...params,
      });
    } else {
      res = await createBidding({ listing_id: listingID, accepting_target_price: true });
    }

    await mutateListing();
    setIsCreatingBidding(false);
    router.replace(Routes.BiddingSuccess, {
      searchParams: { listingID: `${listingID}` },
      state: { biddingID: `${res?.bidding_id}`, canReceiveSuggest: `${res?.can_receive_suggest}` },
    });
  }, [router, listingID, params, mutateListing]);

  const handleClickBack = useCallback(() => {
    router.replace(Routes.BiddingForm, {
      searchParams: { listingID: router.query.listingID as string },
      state: { params: router.query.params as string },
    });
  }, [router]);

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
          isCreatingBidding={isCreatingBidding}
          onClickBack={handleClickBack}
          onClickNext={handleClickNext}
        />
      )}
    </Panel>
  );
});
