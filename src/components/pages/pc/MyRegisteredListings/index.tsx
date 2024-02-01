import { memo, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AuthRequired, Loading, Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { MyRegisteredListings as MyRegisteredListingsTemplate } from '@/components/templates';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import replaceFirstOccurrence from '@/utils/replaceFirstOccurrence';

import useAPI_GetUserInfo from '@/apis/user/getUserInfo';

import listingEligibilityCheck from '@/apis/listing/listingEligibilityCheck';

import Routes from '@/router/routes';

import useMyRegisteredListings from './useMyRegisteredListings';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const customRouter = useCustomRouter(depth);

  const router = useRouter();

  const { data: userData } = useAPI_GetUserInfo();

  const { handleUpdateReturnUrl } = useReturnUrl();

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

  const [tab, setTab] = useState(Number(customRouter?.query?.tab ?? 1));

  const [isLoading, setIsLoading] = useState(false);

  const [openVerificationAddressPopup, setOpenVerificationAddressPopup] = useState(false);

  const [openNeedMoreVerificationAddressPopup, setOpenNeedMoreVerificationAddressPopup] = useState(false);

  useEffect(() => {
    if (customRouter?.query?.tab) {
      setTab(Number(customRouter?.query?.tab));
    } else {
      setTab(1);
    }
  }, [customRouter?.query?.tab]);

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

  const handleClickListingItem = (listingId: number) => () => {
    if (isDeleteActive) return;

    customRouter.replace(Routes.ListingDetail, {
      persistParams: true,
      searchParams: {
        listingID: `${listingId}`,
        back: `${customRouter.asPath}`,
      },
    });
  };

  const handleNavigateToListingCreate = async () => {
    if (!userData) return;

    if (!userData.is_verified) {
      const path = replaceFirstOccurrence(router.asPath, Routes.MyRegisteredListingList, Routes.VerifyCi);

      router.push(path);

      handleUpdateReturnUrl(`/${Routes.My}/${Routes.MyAddress}?default=1`);
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
        customRouter.replace(Routes.ListingSelectAddress, {
          searchParams: {
            origin: customRouter.asPath,
          },
        });
      }
    }
  };

  const handleNavigateToListingDetailPassed = (listingId: number) => () => {
    customRouter.replace(Routes.ListingDetailPassed, {
      persistParams: true,
      searchParams: {
        listingID: `${listingId}`,
      },
    });
  };

  const handleChangeListingTab = useCallback(
    (newValue: number) => {
      setTab(Number(newValue));

      handleCancelDelete();

      const depth1 = router?.query?.depth1;
      const depth2 = router?.query?.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        router.push({
          pathname: `/${depth1}/${Routes.MyRegisteredListingList}`,
          query: { ...query, tab: `${newValue}` },
        });
      } else {
        router.push({
          pathname: `/${Routes.MyRegisteredListingList}`,
          query: { ...query, tab: `${newValue}` },
        });
      }
    },
    [handleCancelDelete, router],
  );

  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : (
          <MyRegisteredListingsTemplate
            tab={tab}
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
      </Panel>

      {openVerificationAddressPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SubTitle>
                매물등록을 위해서는 집주인 인증이 필요합니다.
                <br />
                우리집을 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setOpenVerificationAddressPopup(false)}>취소</Popup.CancelButton>
              <Popup.ActionButton
                onClick={() => {
                  setOpenVerificationAddressPopup(false);

                  customRouter.replace(Routes.MyAddress, { searchParams: { origin: customRouter.asPath } });
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

                  customRouter.replace(Routes.MyAddress, { searchParams: { origin: customRouter.asPath } });
                }}
              >
                인증하기
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </AuthRequired>
  );
});
