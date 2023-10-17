import danjiUserAddressCheck from '@/apis/danji/danjiUserAddressCheck';
import useAPI_GetMyAddressList from '@/apis/my/getMyAddressList';
import { MobAuthRequired, MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { ListingSelectAddress, MobHog } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useState, useEffect } from 'react';

export default memo(() => {
  const router = useRouter();

  const { user } = useAuth();

  const [showGuidePopup, setShowGuidePopup] = useState(false);
  const [selectedUserAddressID, setSelectedUserAddressID] = useState<number>();
  const [showInActivePopup, setShowInActivePopup] = useState(false);
  const [showNoDanjiOwnerPopup, setShowNoDanjiOwnerPopup] = useState(false);
  const [showNoListingsPopup, setShowNoListingsPopup] = useState(false);

  const [isFetch, setIsFetch] = useState<boolean>(false);

  const { list } = useAPI_GetMyAddressList({
    activeOnly: true,
    danjiID: router?.query?.danjiID ? Number(router.query.danjiID) : undefined,
    isFetch,
  });

  const handleClickItem = useCallback(
    (id: number) => {
      if (selectedUserAddressID === id) {
        setSelectedUserAddressID(undefined);
        return;
      }
      setSelectedUserAddressID(id);
    },
    [selectedUserAddressID],
  );

  const handleNext = useCallback(() => {
    if (!selectedUserAddressID) return;

    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateForm}`,
      query: {
        ...(router?.query?.origin ? { origin: router?.query?.origin } : {}),
        ...(router?.query?.danjiID ? { danjiID: router?.query?.danjiID } : {}),
        userAddressID: `${selectedUserAddressID}`,
      },
    });
  }, [router, selectedUserAddressID]);

  const handleClickBack = useCallback(() => {
    if (router?.query?.origin) {
      router.replace(router.query.origin as string);
      return;
    }

    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  const handleClickHome = useCallback(() => {
    router.push(`/${Routes.EntryMobile}`);
  }, [router]);

  const handleCloseGuidePopup = useCallback(() => {
    setShowGuidePopup(false);
  }, []);

  const handleCloseNoDanjiOwnerPopup = useCallback(() => {
    setShowNoDanjiOwnerPopup(false);
    handleClickBack();
  }, [handleClickBack]);

  const handleCloseNoListingsPopup = useCallback(() => {
    setShowNoListingsPopup(false);
    handleClickBack();
  }, [handleClickBack]);

  const handleClickAddMyAddress = useCallback(() => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
      query: {
        ...(router?.query?.origin ? { origin: router?.query?.origin } : {}),
        ...(router?.query?.danjiID ? { danjiID: router?.query?.danjiID } : {}),
      },
    });
  }, [router]);

  useEffect(() => {
    async function checkEligibleDanjiListingOwner(danjiID: number) {
      const res = await danjiUserAddressCheck({ danji_id: danjiID });

      if (res?.has_user_address === false) {
        setShowNoDanjiOwnerPopup(true);
        return;
      }

      if (res?.has_user_address === true && res?.can_create_listing === false) {
        setShowNoDanjiOwnerPopup(true);
        return;
      }

      setIsFetch(true);
      setShowGuidePopup(true);
    }

    if (!router?.query?.danjiID && user && user?.hasAddress === false) {
      setShowInActivePopup(true);
      return;
    }

    if (!router?.query?.danjiID && user && user?.hasAddress === true) {
      setIsFetch(true);
      setShowGuidePopup(true);
      return;
    }

    if (router?.query?.danjiID && user) {
      const di = Number(router.query.danjiID);

      checkEligibleDanjiListingOwner(di);
    }
  }, [user, router]);
  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        {showGuidePopup && <MobHog onClickBack={handleClickBack} onClickListingCreate={handleCloseGuidePopup} />}

        {!showInActivePopup && !showNoDanjiOwnerPopup && !showNoListingsPopup && !showGuidePopup && (
          <ListingSelectAddress
            list={list}
            onClickBack={handleClickBack}
            selectedUserAddressID={selectedUserAddressID}
            onClickNext={handleNext}
            onClickItem={handleClickItem}
            onClickAddMyAddress={handleClickAddMyAddress}
          />
        )}

        {showInActivePopup && (
          <OverlayPresenter>
            <Popup>
              <Popup.ContentGroup tw="py-6">
                <Popup.SubTitle tw="text-center">
                  현재 로그인 계정으로는
                  <br />
                  접근이 불가능한 페이지입니다.
                </Popup.SubTitle>
              </Popup.ContentGroup>
              <Popup.ButtonGroup>
                <Popup.ActionButton onClick={handleClickHome}>네고시오 홈으로 돌아가기</Popup.ActionButton>
              </Popup.ButtonGroup>
            </Popup>
          </OverlayPresenter>
        )}

        {showNoDanjiOwnerPopup && (
          <OverlayPresenter>
            <Popup>
              <Popup.ContentGroup tw="py-6">
                <Popup.SubTitle tw="text-center">
                  이 단지의 집주인만 매물등록이 가능합니다.
                  <br />
                  우리집을 인증하시겠습니까?
                </Popup.SubTitle>
              </Popup.ContentGroup>
              <Popup.ButtonGroup>
                <Popup.CancelButton onClick={handleCloseNoDanjiOwnerPopup}>취소</Popup.CancelButton>
                <Popup.ActionButton onClick={handleClickAddMyAddress}>인증하기</Popup.ActionButton>
              </Popup.ButtonGroup>
            </Popup>
          </OverlayPresenter>
        )}

        {showNoListingsPopup && (
          <OverlayPresenter>
            <Popup>
              <Popup.ContentGroup tw="py-6">
                <Popup.SubTitle tw="text-center">
                  추가로 매물등록이 가능한 우리집 정보가 없습니다.
                  <br />
                  우리집을 추가 인증하시겠습니까?
                </Popup.SubTitle>
              </Popup.ContentGroup>
              <Popup.ButtonGroup>
                <Popup.CancelButton onClick={handleCloseNoListingsPopup}>취소</Popup.CancelButton>
                <Popup.ActionButton onClick={handleClickAddMyAddress}>인증하기</Popup.ActionButton>
              </Popup.ButtonGroup>
            </Popup>
          </OverlayPresenter>
        )}
      </MobileContainer>
    </MobAuthRequired>
  );
});
