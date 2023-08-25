import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';
import { MobAuthRequired, MobileContainer } from '@/components/atoms';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import Routes from '@/router/routes';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import { DanjiRecommendationSummary as DanjiRecommendationSummaryTemplate } from '@/components/templates';
import danjiRecommendationFinal from '@/apis/danji/danjiRecommendationFinal';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default memo(() => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [popup, setPopup] = useState(false);

  const { mutate } = useAPI_GetDashboardInfo();

  const params = useMemo<Record<string, any>>(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const handleClickBack = useCallback(() => {
    setPopup(true);
  }, []);

  const handleClickPopupCTA = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.DanjiRecommendation}`);
  }, [router]);

  const handleClickClosePopupCTA = useCallback(() => {
    setPopup(false);
  }, []);

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

    router.replace(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}`);
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
      {popup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>추천받기를 종료하시겠습니까?</Popup.Title>
              <Popup.Body>
                추천받기를 종료하시면 입력하신 내용이 모두 삭제됩니다.
                <br />
                입력한 내용을 확인 또는 수정하시려면 화면을 위로 이동해 주세요.
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handleClickClosePopupCTA}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={handleClickPopupCTA}>추천받기 종료</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobAuthRequired>
  );
});
