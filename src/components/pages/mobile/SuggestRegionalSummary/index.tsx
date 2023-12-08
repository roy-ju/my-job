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
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}`,
      query: {
        ...(params ? { params: JSON.stringify(params) } : {}),
        ...(params?.address ? { address: params.address as string } : {}),
        ...(router?.query?.forms ? { forms: router.query.forms as string } : {}),
        ...(router?.query?.entry ? { entry: router.query.entry as string } : {}),
        ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
        ...(router?.query?.redirect ? { redirect: router.query.redirect as string } : {}),
      },
    });
  }, [router, params]);

  const handleClickNext = useCallback(async () => {
    setIsCreating(true);

    delete params?.address;
    await createSuggestRegional(params);
    await mutate();
    toast.success('구해요 글이 등록되었습니다.');

    setIsCreating(false);

    if (router?.query?.origin) {
      router.replace(router.query.origin as string);
      return;
    }

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
          interviewAvailabletimes={params?.interview_available_times}
          negotiable={params?.negotiable}
        />
      </MobileContainer>
    </MobAuthRequired>
  );
});
