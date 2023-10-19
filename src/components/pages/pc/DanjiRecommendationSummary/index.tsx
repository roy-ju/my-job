import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';
import { AuthRequired, Panel } from '@/components/atoms';
import { useIsomorphicLayoutEffect, useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import Routes from '@/router/routes';
import React, { useCallback, useMemo, useState } from 'react';
import { BuyOrRent } from '@/constants/enums';
import { DanjiRecommendationSummary as DanjiRecommendationSummaryTemplate } from '@/components/templates';
import danjiRecommendationFinal from '@/apis/danji/danjiRecommendationFinal';
import { toast } from 'react-toastify';
import { mutate as otherMutate } from 'swr';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function DanjiRecommendationSummary({ panelWidth, depth }: Props) {
  const nextRouter = useNextRouter();
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
    if (router.query.entry === 'danji') {
      nextRouter.replace(
        `/${Routes.DanjiDetail}/${Routes.DanjiRecommendation}?danjiID=${
          params.danji_id
        }&entry=danji&params=${JSON.stringify(params)}&forms=${router.query.forms}&redirect=${router.query.redirect}`,
      );
    } else if (router.query.entry === 'danjiSuggestListings') {
      nextRouter.replace(
        `/${Routes.SuggestListings}/${Routes.DanjiRecommendation}?danjiID=${
          params.danji_id
        }&entry=danji&params=${JSON.stringify(params)}&forms=${router.query.forms}&redirect=${router.query.redirect}`,
      );
    } else if (router.query.depth1 === Routes.My) {
      nextRouter.replace(
        `/${Routes.My}/${Routes.DanjiRecommendation}?danjiID=${params.danji_id}&params=${JSON.stringify(
          params,
        )}&forms=${router.query.forms}&redirect=${router.query.redirect}&back=${true}`,
      );
    } else {
      nextRouter.replace(
        `${Routes.DanjiRecommendation}?danjiID=${params.danji_id}&params=${JSON.stringify(params)}&forms=${
          router.query.forms
        }&redirect=${router.query.redirect}`,
      );
    }
  }, [nextRouter, router, params]);

  const handleClickNext = useCallback(async () => {
    setIsCreating(true);

    delete params?.address;

    await danjiRecommendationFinal({
      ...params,
      danji_id: Number(params.danji_id),
      pyoungs: params.pyoungs.join(','),
    });

    await mutate();
    await otherMutate(() => true, undefined);

    toast.success('구해요 글이 등록되었습니다.');

    nextRouter.replace(`/${Routes.DanjiDetail}?danjiID=${params.danji_id}`);
  }, [params, mutate, nextRouter]);

  const handleAccessDenied = useCallback(() => {}, []);

  useIsomorphicLayoutEffect(() => {
    if (!params) router.pop();
  }, [params, router]);

  return (
    <AuthRequired ciRequired depth={depth} onAccessDenied={handleAccessDenied}>
      <Panel width={panelWidth}>
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
      </Panel>
    </AuthRequired>
  );
}
