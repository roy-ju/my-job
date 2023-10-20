/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useAPI_GetDanjiSuggestList } from '@/apis/danji/danjiSuggestList';

export default memo(() => {
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [danjiID, setDanjiID] = useState<number | null>(null);

  const { mutate } = useAPI_GetDashboardInfo();

  const { mutate: listMutate } = useAPI_GetDanjiSuggestList({
    danjiId: danjiID,
    pageSize: 10,
  });

  const params = useMemo<Record<string, any>>(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const handleClickBack = useCallback(() => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.DanjiRecommendation}`,
      query: {
        ...(params ? { params: JSON.stringify(params) } : {}),
        ...(params?.danji_id ? { danjiID: params.danji_id as string } : {}),
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

    await danjiRecommendationFinal({
      ...params,
      danji_id: Number(params.danji_id),
      pyoungs: params.pyoungs.join(','),
    });

    await mutate();

    if (params.danji_id) {
      await setDanjiID(Number(params.danji_id));
    }

    toast.success('구해요 글이 등록되었습니다.');

    if (router?.query?.redirect) {
      router.replace(router.query.redirect as string);
      return;
    }

    if (router?.query?.origin) {
      router.replace(router.query.origin as string);
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
          interviewAvailabletimes={params?.interview_available_times}
          quickSale={params?.quick_sale}
        />
      </MobileContainer>
    </MobAuthRequired>
  );
});
