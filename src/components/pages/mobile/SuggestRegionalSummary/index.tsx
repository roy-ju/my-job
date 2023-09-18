import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';
import createSuggestRegional from '@/apis/suggest/createSuggestRegional';
import { MobAuthRequired, MobileContainer } from '@/components/atoms';
import { SuggestRegionalSummary } from '@/components/templates';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useMemo, useState } from 'react';
import { RealestateType, BuyOrRent } from '@/constants/enums';
import { toast } from 'react-toastify';

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
    router.push(
      `/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}?address=${params.address}&params=${JSON.stringify(
        params,
      )}&forms=${router.query.forms}`,
    );
  }, [router, params]);

  const handleClickNext = useCallback(async () => {
    setIsCreating(true);

    delete params?.address;
    await createSuggestRegional(params);
    await mutate();
    toast.success('구해요 글이 등록되었습니다.');

    setIsCreating(false);

    router.replace(`/${Routes.EntryMobile}`);
  }, [router, params, mutate]);

  const handleAccessDenied = useCallback(() => {}, []);

  useIsomorphicLayoutEffect(() => {
    if (!params) {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
    }
  }, [params, router]);

  return (
    <MobAuthRequired ciRequired onAccessDenied={handleAccessDenied}>
      <MobileContainer>
        <SuggestRegionalSummary
          onClickBack={handleClickBack}
          onClickNext={handleClickNext}
          isNextButtonLoading={isCreating}
          address={params?.address}
          buyOrRents={params?.buy_or_rents}
          realestateTypes={(params?.realestate_types as string)
            ?.split(',')
            .filter((type) => type !== `${RealestateType.Yunrip}`)
            .join(',')}
          price={params?.buy_or_rents === `${BuyOrRent.Buy}` ? params?.trade_price : params?.deposit}
          monthlyRentFee={params?.monthly_rent_fee}
          minArea={params?.pyoung_from}
          maxArea={params?.pyoung_to}
          purpose={params?.purpose}
          description={params?.note}
          moveInDate={params?.move_in_date}
          moveInDateType={params?.move_in_date_type}
          investAmount={params?.invest_amount}
          negotiable={params?.negotiable}
        />
      </MobileContainer>
    </MobAuthRequired>
  );
});
