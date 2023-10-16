import { Loading, MobAuthRequired, MobileContainer } from '@/components/atoms';
import { MyRegisteredListings as MyRegisteredListingsTemplate } from '@/components/templates';
import { memo, useCallback, useEffect, useState } from 'react';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { useAuth } from '@/hooks/services';
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
  const [popup, setPopup] = useState(false);

  const { user } = useAuth();

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

  const handleRegisterMyHome = useCallback(() => {
    setPopup(false);
    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
      query: { origin: router?.asPath as string },
    });
  }, [router]);

  const handleNavigateToListingCreate = () => {
    if (user && user?.hasAddress) {
      router.push(`/${Routes.EntryMobile}/${Routes.HOG}`);
      return;
    }
    setPopup(true);
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

  const handleCloseErrorPopup = () => {
    setPopup(false);
  };

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
      {popup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SubTitle tw="text-center">
                추가로 매물등록이 가능한 우리집 정보가 없습니다.
                <br />
                우리집을 추가 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handleCloseErrorPopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleRegisterMyHome}>인증하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
});
