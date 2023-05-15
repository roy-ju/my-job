import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';
import createSuggestRegional from '@/apis/suggest/createSuggestRegional';
import { Panel } from '@/components/atoms';
import { SuggestRegionalSummary } from '@/components/templates';
import { useIsomorphicLayoutEffect, useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useMemo, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const [isCreating, setIsCreating] = useState(false);

  const { mutate } = useAPI_GetDashboardInfo();

  const params = useMemo<Record<string, any>>(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const handleClickBack = useCallback(() => {
    router.replace(Routes.SuggestRegionalForm);
  }, [router]);

  const handleClickNext = useCallback(async () => {
    setIsCreating(true);

    delete params?.address;
    await createSuggestRegional(params);
    await mutate();

    setIsCreating(false);

    router.replace(Routes.SuggestRegionalSuccess, {
      state: {
        params: router.query.params as string,
      },
    });
  }, [router, params, mutate]);

  useIsomorphicLayoutEffect(() => {
    if (!params) router.pop();
  }, [params, router]);

  return (
    <Panel width={panelWidth}>
      <SuggestRegionalSummary
        onClickBack={handleClickBack}
        onClickNext={handleClickNext}
        isNextButtonLoading={isCreating}
        address={params?.address}
        buyOrRents={params?.buy_or_rents}
        realestateTypes={params?.realestate_types}
        price={params?.buy_or_rents === '1' ? params?.trade_price : params?.deposit}
        monthlyRentFee={params?.monthly_rent_fee}
        minArea={params?.pyoung_from}
        maxArea={params?.pyoung_to}
        purpose={params?.purpose}
        floor={params?.floors}
        description={params?.note}
        remainingAmountPaymentTime={params?.remaining_amount_payment_time}
        remainingAmountPaymentTimeType={params?.remaining_amount_payment_time_type}
        moveInDate={params?.move_in_date}
        moveInDateType={params?.move_in_date_type}
      />
    </Panel>
  );
});
