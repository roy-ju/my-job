import { AuthRequired, Loading, Panel } from '@/components/atoms';
import { MyRegisteredListings as MyRegisteredListingsTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback, useEffect, useState } from 'react';
import Routes from '@/router/routes';
import { OverlayPresenter, Popup } from '@/components/molecules';

import useAPI_GetUserInfo from '@/apis/user/getUserInfo';
import listingEligibilityCheck from '@/apis/listing/listingEligibilityCheck';
import useMyRegisteredListings from './useMyRegisteredListings';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const { data: userData } = useAPI_GetUserInfo();

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
  const [tab, setTab] = useState(Number(router.query.tab ?? 1));
  const [isLoading, setIsLoading] = useState(false);

  const [openVerificationAddressPopup, setOpenVerificationAddressPopup] = useState(false);
  const [openNeedMoreVerificationAddressPopup, setOpenNeedMoreVerificationAddressPopup] = useState(false);

  useEffect(() => {
    if (router.query.tab) {
      setTab(Number(router.query.tab));
    } else {
      setTab(1);
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

  const handleClickListingItem = (listingId: number) => () => {
    if (isDeleteActive) return;
    router.replace(Routes.ListingDetail, {
      persistParams: true,
      searchParams: {
        listingID: `${listingId}`,
        back: `${router.asPath}`,
      },
    });
  };

  const handleNavigateToListingCreate = async () => {
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
        router.replace(Routes.ListingSelectAddress, {
          searchParams: {
            origin: router.asPath,
          },
        });
      }
    }
  };

  const handleNavigateToListingDetailPassed = (listingId: number) => () => {
    router.replace(Routes.ListingDetailPassed, {
      persistParams: true,
      searchParams: {
        listingID: `${listingId}`,
      },
    });
  };

  const handleChangeListingTab = useCallback(
    (newValue: number) => {
      setTab(Number(newValue));
      router.replaceCurrent(Routes.MyRegisteredListingList, {
        persistParams: true,
        searchParams: { tab: `${newValue}` },
      });
    },
    [setTab, router],
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
                  router.replace(Routes.MyAddress, { searchParams: { origin: router.asPath } });
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
                  router.replace(Routes.MyAddress, { searchParams: { origin: router.asPath } });
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
