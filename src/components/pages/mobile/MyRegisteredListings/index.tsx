import { Loading, MobAuthRequired, MobileContainer } from '@/components/atoms';
import { MyRegisteredListings as MyRegisteredListingsTemplate } from '@/components/templates';
import { memo, useCallback, useEffect, useState } from 'react';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { OverlayPresenter, Popup } from '@/components/molecules';
import useAPI_GetUserInfo from '@/apis/user/getUserInfo';
import listingEligibilityCheck from '@/apis/listing/listingEligibilityCheck';
import useMyRegisteredListings from './useMyRegisteredListings';

export default memo(() => {
  const router = useRouter();
  const {
    myRegisteringListingCount,
    myRegisteringListingData,
    myRegisteringListingIncrementalPageNumber,
    myRegisteringListingIsLoading,

    myActiveListingCount,
    myActiveListingData,
    myActiveListingIncrementalPageNumber,
    myActiveListingIsLoading,

    myContractCompleteListingCount,
    myContractCompleteListingData,
    myContractCompleteListingIncrementalPageNumber,
    myContractCompleteListingIsLoading,

    myCancelledListingCount,
    myCancelledListingData,
    myCancelledListingIncrementalPageNumber,
    myCancelledListingIsLoading,

    isDeleteActive,
    isPopupActive,
    handleChangeCheckbox,
    handleActiveDelete,
    handleCancelDelete,
    handleOpenPopup,
    handleClosePopup,

    checkedListingIdList,
    handleDeleteListingList,
  } = useMyRegisteredListings();
  const [tab, setTab] = useState(Number(router.query.tab));
  const [isLoading, setIsLoading] = useState(false);

  const [openVerificationAddressPopup, setOpenVerificationAddressPopup] = useState(false);
  const [openNeedMoreVerificationAddressPopup, setOpenNeedMoreVerificationAddressPopup] = useState(false);

  const { data: userData } = useAPI_GetUserInfo();

  useEffect(() => {
    if (router.query.tab) {
      setTab(Number(router.query.tab));
    }
  }, [router.query.tab]);

  useEffect(() => {
    const isPromiseFullfilled =
      myRegisteringListingIsLoading &&
      myActiveListingIsLoading &&
      myContractCompleteListingIsLoading &&
      myCancelledListingIsLoading;

    setIsLoading(isPromiseFullfilled);
  }, [
    myRegisteringListingIsLoading,
    myActiveListingIsLoading,
    myContractCompleteListingIsLoading,
    myCancelledListingIsLoading,
  ]);

  const handleClickListingItem = (listingID: number) => () => {
    if (isDeleteActive) return;
    router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}`);
  };

  const handleNavigateToListingCreate = async () => {
    if (!userData) {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
        query: {
          redirect: router.asPath,
        },
      });
      return;
    }

    if (!userData.is_verified) {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
        query: {
          redirect: router.asPath,
        },
      });
      return;
    }

    if (!userData?.has_address) {
      setOpenVerificationAddressPopup(true);
      return;
    }

    if (userData?.has_address) {
      const res = await listingEligibilityCheck({ danji_id: null });

      if (res && !res?.is_eligible) {
        setOpenNeedMoreVerificationAddressPopup(true);
        return;
      }

      if (res && res?.is_eligible) {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.ListingSelectAddress}`,
          query: {
            origin: router.asPath,
          },
        });
      }
    }
  };

  const handleNavigateToListingDetailPassed = (listingID: number) => () => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingDetailPassed}?listingID=${listingID}`);
  };

  const handleChangeListingTab = useCallback(
    (newValue: number) => {
      setTab(Number(newValue));
    },
    [setTab],
  );

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
      } else {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
      }
    }
  }, [router]);

  return (
    <>
      <MobAuthRequired>
        <MobileContainer>
          {isLoading ? (
            <div tw="py-20">
              <Loading />
            </div>
          ) : (
            <MyRegisteredListingsTemplate
              tab={tab}
              onClickBack={handleClickBack}
              onChangeListingTab={handleChangeListingTab}
              onClickListingItem={handleClickListingItem}
              onClickNavigateToListingCreate={handleNavigateToListingCreate}
              onClickNavigateToListingDetailPassed={handleNavigateToListingDetailPassed}
              isDeleteActive={isDeleteActive}
              isPopupActive={isPopupActive}
              checkedListingIdList={checkedListingIdList}
              onChangeCheckbox={handleChangeCheckbox}
              onDeleteListingList={handleDeleteListingList}
              onActiveDelete={handleActiveDelete}
              onCancelDelete={handleCancelDelete}
              onOpenPopup={handleOpenPopup}
              onClosePopup={handleClosePopup}
              myRegisteringListingCount={myRegisteringListingCount ?? 0}
              myRegisteringListingData={myRegisteringListingData ?? []}
              myRegisteringListingIncrementalPageNumber={myRegisteringListingIncrementalPageNumber}
              myActiveListingCount={myActiveListingCount ?? 0}
              myActiveListingData={myActiveListingData ?? []}
              myActiveListingIncrementalPageNumber={myActiveListingIncrementalPageNumber}
              myContractCompleteListingCount={myContractCompleteListingCount ?? 0}
              myContractCompleteListingData={myContractCompleteListingData ?? []}
              myContractCompleteListingIncrementalPageNumber={myContractCompleteListingIncrementalPageNumber}
              myCancelledListingCount={myCancelledListingCount ?? 0}
              myCancelledListingData={myCancelledListingData ?? []}
              myCancelledListingIncrementalPageNumber={myCancelledListingIncrementalPageNumber}
            />
          )}
        </MobileContainer>
      </MobAuthRequired>

      {openVerificationAddressPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SubTitle>
                이 단지의 집주인만 매물등록이 가능합니다.
                <br />
                우리집을 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setOpenVerificationAddressPopup(false)}>취소</Popup.CancelButton>
              <Popup.ActionButton
                onClick={() => {
                  setOpenVerificationAddressPopup(false);
                  router.push({
                    pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
                    query: {
                      origin: router.asPath,
                    },
                  });
                }}
              >
                인증하기
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {openNeedMoreVerificationAddressPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SubTitle>
                추가로 매물등록이 가능한 우리집 정보가 없습니다.
                <br />
                우리집을 추가 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setOpenNeedMoreVerificationAddressPopup(false)}>
                취소
              </Popup.CancelButton>
              <Popup.ActionButton
                onClick={() => {
                  setOpenNeedMoreVerificationAddressPopup(false);
                  router.push({
                    pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
                    query: {
                      origin: router.asPath,
                    },
                  });
                }}
              >
                인증하기
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
});
