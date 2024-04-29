import { memo, useCallback, useState } from 'react';

import { Panel } from '@/components/atoms';

import { ListingTargetPriceUpdate } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;

  const { data } = useFetchListingDetail(listingID);

  const [price, setPrice] = useState('');
  const [monthlyRentFee, setMonthlyRentFee] = useState('');

  const handleNext = useCallback(() => {
    router.replace(Routes.ListingTargetPriceUpdateSummary, {
      searchParams: {
        listingID: router.query.listingID as string,
      },
      state: {
        price: `${convertPriceInputToNumber(price)}`,
        monthlyRentFee: `${convertPriceInputToNumber(monthlyRentFee)}`,
      },
    });
  }, [router, price, monthlyRentFee]);

  return (
    <Panel width={panelWidth}>
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
      />
    </Panel>
  );
});
