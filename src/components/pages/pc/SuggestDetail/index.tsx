import useAPI_getMyRecommendedList from '@/apis/suggest/getMyRecommendedList';
import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import suggestRecommendEligibility from '@/apis/suggest/suggestRecommendEligibility';
import useAPI_GetUserInfo from '@/apis/user/getUserInfo';
import { Loading, Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { SuggestDetail } from '@/components/templates';
import { SuggestStatus } from '@/constants/enums';
import { useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import Routes from '@/router/routes';

import { memo, useCallback, useMemo, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const { data: userData } = useAPI_GetUserInfo();

  const [addressApplyPopup, setAddressApplyPopup] = useState(false);

  const suggestID = useMemo(
    () => (router?.query?.suggestID ? Number(router.query.suggestID) : undefined),
    [router.query.suggestID],
  );

  const { data, isLoading } = useAPI_GetSuggestDetail(suggestID);

  const { data: myRecommendedList, mutate } = useAPI_getMyRecommendedList({ suggestId: suggestID });

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
      const response = await suggestRecommendEligibility({ danji_id: data.danji_id });

      if (response && !response?.is_eligible) {
        setAddressApplyPopup(true);
        return;
      }

      if (response && response?.is_eligible) {
        router.replace(Routes.SuggestListingForm, {
          searchParams: data?.danji_id
            ? { danjiID: `${data.danji_id}`, suggestID: `${suggestID}` }
            : { suggestID: `${suggestID}` },
        });
      }
    }
  }, [data?.danji_id, router, suggestID, userData]);

  const handleAddressApplyPopupCTA = useCallback(() => {
    nextRouter.replace(`/${Routes.My}/${Routes.MyAddress}`);
  }, [nextRouter]);

  const handleMutate = () => {
    mutate();
  };

  const closePopup = () => {
    setAddressApplyPopup(false);
  };

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
            onMutate={handleMutate}
          />
        ) : null}
      </Panel>

      {addressApplyPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SmallTitle>
                매물을 추천하시려면
                <br />
                해당 단지에 소유자 인증이 필요합니다.
                <br />
                우리집 등록으로 이동하시겠습니까?
              </Popup.SmallTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={closePopup}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={handleAddressApplyPopupCTA}>우리집 등록하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
});
