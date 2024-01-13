import { memo, useCallback, useMemo, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { Loading, Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { SuggestDetail } from '@/components/templates';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { useRouter } from '@/hooks/utils';

import { isMobile } from '@/utils/is';

import { SuggestStatus } from '@/constants/enums';

import Routes from '@/router/routes';

import useAPI_getMyRecommendedList from '@/apis/suggest/getMyRecommendedList';

import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';

import useAPI_GetUserInfo from '@/apis/user/getUserInfo';

import suggestView from '@/apis/suggest/suggestView';

import { apiService } from '@/services';

interface Props {
  depth: number;
  panelWidth?: string;
  ipAddress?: string;
}

export default memo(({ panelWidth, depth, ipAddress }: Props) => {
  const router = useRouter(depth);

  const nextRouter = useNextRouter();

  const suggestID = useMemo(
    () => (router?.query?.suggestID ? Number(router.query.suggestID) : undefined),
    [router.query.suggestID],
  );

  const { data: userData } = useAPI_GetUserInfo();

  const { data, isLoading, mutate: detailMutate } = useAPI_GetSuggestDetail(suggestID);

  const { data: myRecommendedList, mutate } = useAPI_getMyRecommendedList({ suggestId: suggestID });

  const [needVerifyAddressPopup, setNeedVerifyAddressPopup] = useState(false);

  const disabledCTA = useMemo(() => {
    if (data?.suggest_status === SuggestStatus.Active) return false;

    return true;
  }, [data?.suggest_status]);

  const isExistMySuggested = useMemo(() => !!myRecommendedList?.list?.length, [myRecommendedList?.list?.length]);

  const handleClickCTA = useCallback(async () => {
    if (!suggestID) return;

    if (!userData) {
      router.replace(Routes.Login, {
        persistParams: true,
        searchParams: { redirect: `${router.asPath}` },
      });

      return;
    }

    if (!userData.is_verified) {
      router.replace(Routes.VerifyCi, {
        persistParams: true,
        searchParams: { redirect: `${router.asPath}` },
      });
      return;
    }

    if (data?.danji_id) {
      const res = await apiService.danjiSuggestRecommendEligibility({ danji_id: data.danji_id });

      if (res && !res?.is_eligible) {
        setNeedVerifyAddressPopup(true);
        return;
      }

      if (res && res?.is_eligible) {
        router.replace(Routes.SuggestSelectAddress, {
          searchParams: {
            origin: router.asPath,
            suggestID: `${suggestID}`,
            ...(data.danji_id ? { danjiID: `${data.danji_id}` } : {}),
          },
        });
      }
    }
  }, [data?.danji_id, router, suggestID, userData]);

  const handleMutate = useCallback(() => {
    mutate();
  }, [mutate]);

  const needVerifyAddressPopupCTA = useCallback(() => {
    router.replace(Routes.MyAddress, {
      searchParams: {
        origin: router.asPath,
        suggestID: `${suggestID}`,
        ...(data?.danji_id ? { danjiID: `${data.danji_id}` } : {}),
      },
    });
  }, [data, router, suggestID]);

  const closeNeedVerifyAddressPopup = useCallback(() => {
    setNeedVerifyAddressPopup(false);
  }, []);

  const onClickBack = useCallback(() => {
    if (router?.query?.back) {
      nextRouter.replace(router.query.back as string);
    }
  }, [router, nextRouter]);

  async function handleSuggestView() {
    if (!data) return;

    await suggestView({
      suggest_id: data?.suggest_id,
      ip_address: ipAddress !== '::1' ? ipAddress ?? '' : '',
      browser: navigator.userAgent,
      device: isMobile(navigator.userAgent) ? 'MOBILE' : 'PC',
    });

    await detailMutate();

    if (window?.Negocio?.callbacks?.mutateSuggestList) {
      window.Negocio.callbacks.mutateSuggestList();
    }
  }

  useIsomorphicLayoutEffect(() => {
    handleSuggestView();
  }, [handleSuggestView, data?.danji_id]);

  return (
    <>
      <Panel width={panelWidth}>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : data ? (
          <SuggestDetail
            data={data}
            myRecommendedList={myRecommendedList?.list}
            isExistMySuggested={isExistMySuggested}
            disabledCTA={disabledCTA}
            onClickCTA={handleClickCTA}
            onClickBack={router.query.back ? onClickBack : undefined}
            onMutate={handleMutate}
          />
        ) : null}

        {needVerifyAddressPopup && (
          <OverlayPresenter>
            <Popup>
              <Popup.ContentGroup tw="[text-align: center]">
                <Popup.SmallTitle>
                  이 단지의 집주인만 매물추천이 가능합니다.
                  <br />
                  우리집 등록하고 집주인 인증하러 가시겠습니까?
                </Popup.SmallTitle>
              </Popup.ContentGroup>
              <Popup.ButtonGroup>
                <Popup.CancelButton onClick={closeNeedVerifyAddressPopup}>닫기</Popup.CancelButton>
                <Popup.ActionButton onClick={needVerifyAddressPopupCTA}>집주인 인증하기</Popup.ActionButton>
              </Popup.ButtonGroup>
            </Popup>
          </OverlayPresenter>
        )}
      </Panel>
    </>
  );
});
