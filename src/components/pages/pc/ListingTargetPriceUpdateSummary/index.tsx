import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import updateTargetPrice from '@/apis/listing/updateTargetPrice';
import { Panel } from '@/components/atoms';
import { ListingTargetPriceUpdateSummary } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const listingID = Number(router.query.listingID) ?? 0;

  const afterPrice = Number(router.query.price) ?? 0;
  const afterMonthlyRentFee = Number(router.query.monthlyRentFee) ?? 0;

  const { data, mutate } = useAPI_GetListingDetail(listingID);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleClickNext = useCallback(async () => {
    setIsUpdating(true);

    console.log(afterMonthlyRentFee, afterPrice);
    await updateTargetPrice({
      listing_id: listingID,
      trade_or_deposit_price: afterPrice,
      monthly_rent_fee: afterMonthlyRentFee,
    });
    await mutate();

    setIsUpdating(false);

    await router.pop();
    toast.success('희망가를 수정했습니다.');
  }, [router, mutate, afterPrice, afterMonthlyRentFee, listingID]);

  return (
    <Panel width={panelWidth}>
      <ListingTargetPriceUpdateSummary
        beforeMonthlyRentFee={data?.monthly_rent_fee}
        beforePrice={data?.trade_or_deposit_price}
        afterMonthlyRentFee={afterMonthlyRentFee}
        afterPrice={afterPrice}
        isUpdating={isUpdating}
        onClickBack={() => router.replace(Routes.ListingTargetPriceUpdate, { persistParams: true })}
        onClickCancel={() => router.pop()}
        onClickSubmit={handleClickNext}
      />
    </Panel>
  );
});
