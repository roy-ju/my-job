import useAPI_GetMyAddressList from '@/apis/my/getMyAddressList';
import { MobAuthRequired, MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { MobHog, SelectAddressTemplate } from '@/components/templates';
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

  const [isFetch, setIsFetch] = useState<boolean>(false);

  const { list } = useAPI_GetMyAddressList({
    activeOnly: true,
    danjiID: router?.query?.danjiID ? Number(router.query.danjiID) : undefined,
    isFetch,
    exclude_duplicated_listing: true,
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
    if (user && !user.hasAddress) {
      setShowInActivePopup(true);
      return;
    }

    setIsFetch(true);
  }, [user, router]);

  useEffect(() => {
    if (list && list?.length > 0) {
      setShowGuidePopup(true);
    }
  }, [list]);

  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        {showGuidePopup && <MobHog onClickBack={handleClickBack} onClickListingCreate={handleCloseGuidePopup} />}

        {!showInActivePopup && !showGuidePopup && (
          <SelectAddressTemplate
            type="listing"
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
      </MobileContainer>
    </MobAuthRequired>
  );
});
