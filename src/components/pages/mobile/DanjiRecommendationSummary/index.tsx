import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';
import { MobAuthRequired, MobileContainer } from '@/components/atoms';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import Routes from '@/router/routes';
import React, { memo, useCallback, useMemo, useState } from 'react';

import { BuyOrRent } from '@/constants/enums';
import { DanjiRecommendationSummary as DanjiRecommendationSummaryTemplate } from '@/components/templates';
import danjiRecommendationFinal from '@/apis/danji/danjiRecommendationFinal';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

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
    router.replace(
      `/${Routes.EntryMobile}/${Routes.DanjiRecommendation}?danjiID=${params.danji_id}&params=${JSON.stringify(
        params,
      )}&forms=${router.query.forms}`,
    );
  }, [router, params]);

  const handleClickNext = useCallback(async () => {
    setIsCreating(true);

    delete params?.address;

    await danjiRecommendationFinal({
      ...params,
      danji_id: Number(params.danji_id),
      pyoungs: params.pyoungs.join(','),
    });
    await mutate();

    toast.success('구해요 글이 등록되었습니다.');

    if (router?.query?.redirect) {
      router.replace(router.query.redirect as string);
      return;
    }

    router.replace(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${params?.danji_id}`);
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
        <DanjiRecommendationSummaryTemplate
          onClickBack={handleClickBack}
          onClickNext={handleClickNext}
          isNextButtonLoading={isCreating}
          name={params?.name}
          buyOrRents={params?.buy_or_rents}
          price={params?.buy_or_rents === `${BuyOrRent.Buy}` ? params?.trade_price : params?.deposit}
          monthlyRentFee={params?.monthly_rent_fee}
          purpose={params?.purpose}
          pyoungs={params?.pyoungs}
          description={params?.note}
          moveInDate={params?.move_in_date}
          moveInDateType={params?.move_in_date_type}
          investAmount={params?.invest_amount}
          negotiable={params?.negotiable}
          quickSale={params?.quick_sale}
        />
      </MobileContainer>
    </MobAuthRequired>
  );
});
