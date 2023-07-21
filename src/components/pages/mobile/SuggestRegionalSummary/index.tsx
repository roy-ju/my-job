import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';
import createSuggestRegional from '@/apis/suggest/createSuggestRegional';
import { MobAuthRequired, MobileContainer } from '@/components/atoms';
import { SuggestRegionalSummary } from '@/components/templates';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import Routes from '@/router/routes';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo, useCallback, useMemo, useState } from 'react';
import * as gtag from '@/lib/gtag';
import { OverlayPresenter, Popup } from '@/components/molecules';

// const SuggestRegionalSummary = dynamic(() => import('@/components/templates/SuggestRegionalSummary'));

export default memo(() => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const { mutate } = useAPI_GetDashboardInfo();

  const params = useMemo<Record<string, any>>(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const handleClickBack = useCallback(() => {
    setOpenPopup(true);
  }, []);

  const handleClickNext = useCallback(async () => {
    setIsCreating(true);

    delete params?.address;
    await createSuggestRegional(params);
    await mutate();

    setIsCreating(false);

    gtag.event({
      action: 'suggest_regional_request_submit',
      category: 'button_click',
      label: '지역매물추천 요청 완료 확인 버튼',
      value: '',
    });

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

  const handleAccessDenied = useCallback(() => {
    gtag.event({
      action: 'suggest_regional_redirect_to_login',
      category: 'button_click',
      label: '지역매물추천에서 회원가입or로그인',
      value: '',
    });
  }, []);

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
      </MobileContainer>
      {openPopup && (
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
              <Popup.CancelButton onClick={() => setOpenPopup(false)}>닫기</Popup.CancelButton>
              <Popup.ActionButton
                onClick={() => router.replace(`/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}`)}
              >
                추천받기 종료
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobAuthRequired>
  );
});