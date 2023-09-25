import { Loading, MobileContainer } from '@/components/atoms';
import { MyRegisteredListings as MyRegisteredListingsTemplate } from '@/components/templates';
import { memo, useCallback, useEffect, useState } from 'react';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
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

  useEffect(() => {
    if (router.query.tab) {
      setTab(Number(router.query.tab));
    }
  }, [router.query.tab]);

  useEffect(() => {
    const isPromiseFullfilled =
      !myRegisteringListingIsLoading &&
      !myActiveListingIsLoading &&
      !myContractCompleteListingIsLoading &&
      !myCancelledListingIsLoading;

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

  const handleNavigateToListingCreate = () => {
    router.push(Routes.HOG);
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
    router.back();
  }, [router]);

  if (!isLoading) {
    return (
      <MobileContainer>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
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
    </MobileContainer>
  );
});
