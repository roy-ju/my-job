import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import { MobileContainer } from '@/components/atoms';
import { ListingTargetPriceUpdate } from '@/components/templates';
import Routes from '@/router/routes';
import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';
import { useRouter } from 'next/router';
import { memo, useCallback, useState } from 'react';

export default memo(() => {
  const router = useRouter();
  const listingID = Number(router.query.listingID) ?? 0;

  const { data } = useAPI_GetListingDetail(listingID);

  const [price, setPrice] = useState('');
  const [monthlyRentFee, setMonthlyRentFee] = useState('');

  const handleNext = useCallback(() => {
    router.replace(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.ListingTargetPriceUpdateSummary}`,
        query: {
          listingID: router.query.listingID,
          price: `${convertPriceInputToNumber(price)}`,
          monthlyRentFee: `${convertPriceInputToNumber(monthlyRentFee)}`,
        },
      },
      `/${Routes.EntryMobile}/${Routes.ListingTargetPriceUpdateSummary}?listingID=${router.query.listingID}`,
    );
  }, [router, price, monthlyRentFee]);

  return (
    <MobileContainer>
      <ListingTargetPriceUpdate
        listingTitle={data?.listing?.listing_title}
        address={data?.display_address}
        area={data?.listing?.jeonyong_area}
        floorDescription={data?.listing?.floor_description}
        floor={data?.listing?.floor}
        direction={data?.listing?.direction}
        listingPrice={data?.trade_or_deposit_price}
        listingMonthlyRentFee={data?.monthly_rent_fee}
        listingBuyOrRent={data?.listing?.buy_or_rent}
        highestMonthlyRentFee={data?.highest_bidding_monthly_rent_fee}
        highestPrice={data?.highest_bidding_trade_or_deposit_price}
        price={price}
        onChangePrice={setPrice}
        monthlyRentFee={monthlyRentFee}
        onChangeMonthlyRentFee={setMonthlyRentFee}
        onClickNext={handleNext}
        onClickBack={() => router.back()}
      />
    </MobileContainer>
  );
});
