import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';
import createSuggestRegional from '@/apis/suggest/createSuggestRegional';
import { MobileContainer } from '@/components/atoms';
import { SuggestRegionalSummary } from '@/components/templates';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useMemo, useState } from 'react';

export default memo(() => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const { mutate } = useAPI_GetDashboardInfo();

  const params = useMemo<Record<string, any>>(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const handleClickBack = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}`);
  }, [router]);

  const handleClickNext = useCallback(async () => {
    setIsCreating(true);

    delete params?.address;
    await createSuggestRegional(params);
    await mutate();

    setIsCreating(false);

    router.replace(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.SuggestRegionalSuccess}`,
        query: {
          params: router.query.params,
        },
      },
      `/${Routes.EntryMobile}/${Routes.SuggestRegionalSuccess}`,
    );
  }, [router, params, mutate]);

  useIsomorphicLayoutEffect(() => {
    if (!params) {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
    }
  }, [params, router]);

  return (
    <MobileContainer>
      <SuggestRegionalSummary
        onClickBack={handleClickBack}
        onClickNext={handleClickNext}
        isNextButtonLoading={isCreating}
        address={params?.address}
        buyOrRents={params?.buy_or_rents}
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
    </MobileContainer>
  );
});
