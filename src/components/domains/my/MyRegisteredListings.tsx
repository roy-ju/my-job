import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import Container from '@/components/atoms/Container';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import Loading from '@/components/atoms/Loading';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useFetchUserInfo from '@/services/auth/useFetchUserInfo';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import Routes from '@/router/routes';

import replaceFirstOccurrence from '@/utils/replaceFirstOccurrence';

import { apiService } from '@/services';

import useHandleClickBack from './registered-listings/hooks/useHandleClickBack';

import useTab from './registered-listings/hooks/useTab';

import useMyRegisteredListings from './registered-listings/hooks/useMyRegisteredListings';

import RegisterdListingsHeader from './registered-listings/RegisterdListingsHeader';

import VerificationAddressPopup from './registered-listings/popups/VerificationAddressPopup';

import NeedMoreVerificationAddressPopup from './registered-listings/popups/NeedMoreVerificationAddressPopup';

import RegisteredListingsTab from './registered-listings/RegisteredListingsTab';

import RegisteredListingsList from './registered-listings/RegisteredListingsList';

export default function MyRegisteredListings() {
  const router = useRouter();

  const [openVerificationAddressPopup, setOpenVerificationAddressPopup] = useState(false);

  const [openNeedMoreVerificationAddressPopup, setOpenNeedMoreVerificationAddressPopup] = useState(false);

  const { platform } = useCheckPlatform();

  const { data: user } = useFetchUserInfo();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { handleClickBack } = useHandleClickBack();

  const {
    myRegisteringListingCount,
    myRegisteringListingData,
    myRegisteringListingIncrementalPageNumber,

    myActiveListingCount,
    myActiveListingData,
    myActiveListingIncrementalPageNumber,

    myContractCompleteListingCount,
    myContractCompleteListingData,
    myContractCompleteListingIncrementalPageNumber,

    myCancelledListingCount,
    myCancelledListingData,
    myCancelledListingIncrementalPageNumber,

    isLoading,

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

  const { tab, handleChangeTab } = useTab({ pcCallback: handleCancelDelete });

  const handleClickListingItem = useCallback(
    (listingID: number) => () => {
      if (isDeleteActive) return;

      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          if (depth1 === Routes.MyRegisteredListingList) {
            router.push({
              pathname: `/${Routes.ListingDetail}/${depth2}`,
              query: { ...query, listingID: `${listingID}`, back: `${router.asPath}` },
            });
          } else {
            router.push({
              pathname: `/${depth1}/${Routes.ListingDetail}`,
              query: { ...query, listingID: `${listingID}`, back: `${router.asPath}` },
            });
          }
        } else {
          router.push({
            pathname: `/${Routes.ListingDetail}`,
            query: { ...query, listingID: `${listingID}`, back: `${router.asPath}` },
          });
        }
      }

      if (platform === 'mobile') {
        router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}`);
      }
    },
    [isDeleteActive, platform, router],
  );

  const handleNavigateToListingCreate = useCallback(async () => {
    if (!user) return;

    if (!user.is_verified) {
      if (platform === 'pc') {
        const path = replaceFirstOccurrence(router.asPath, Routes.MyRegisteredListingList, Routes.VerifyCi);
        router.push(path);
        handleUpdateReturnUrl(`/${Routes.My}/${Routes.MyAddress}?default=1`);
        return;
      }

      if (platform === 'mobile') {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
        });
        handleUpdateReturnUrl(`/${Routes.EntryMobile}/${Routes.MyAddress}`);
        return;
      }
    }

    if (!user?.has_address) {
      setOpenVerificationAddressPopup(true);
      return;
    }

    if (user?.has_address) {
      const res = await apiService.listingEligibilityCheck({ id: null });

      if (res && !res?.is_eligible) {
        setOpenNeedMoreVerificationAddressPopup(true);
        return;
      }

      if (res && res?.is_eligible) {
        if (platform === 'pc') {
          const depth1 = router?.query?.depth1 ?? '';
          const depth2 = router?.query?.depth2 ?? '';
          const query = router.query;

          delete query.depth1;
          delete query.depth2;

          if (depth1 && depth2) {
            if (depth1 === Routes.MyRegisteredListingList) {
              router.push({
                pathname: `/${Routes.ListingSelectAddress}/${depth2}`,
                query: { ...query, origin: router.asPath },
              });
            } else {
              router.push({
                pathname: `/${depth1}/${Routes.ListingSelectAddress}`,
                query: { ...query, origin: router.asPath },
              });
            }
          } else {
            router.push({
              pathname: `/${Routes.ListingSelectAddress}`,
              query: { ...query, origin: router.asPath },
            });
          }
        }

        if (platform === 'mobile') {
          router.push({
            pathname: `/${Routes.EntryMobile}/${Routes.ListingSelectAddress}`,
            query: {
              origin: router.asPath,
            },
          });
        }
      }
    }
  }, [handleUpdateReturnUrl, platform, router, user]);

  const handleNavigateToListingDetailPassed = useCallback(
    (listingID: number) => () => {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          if (depth1 === Routes.MyRegisteredListingList) {
            router.push({
              pathname: `/${Routes.ListingDetailPassed}/${depth2}`,
              query: { ...query, listingID: `${listingID}` },
            });
          } else {
            router.push({
              pathname: `/${depth1}/${Routes.ListingDetailPassed}`,
              query: { ...query, listingID: `${listingID}` },
            });
          }
        } else {
          router.push({
            pathname: `/${Routes.ListingDetailPassed}`,
            query: { ...query, listingID: `${listingID}` },
          });
        }
      }

      if (platform === 'mobile') {
        router.push(`/${Routes.EntryMobile}/${Routes.ListingDetailPassed}?listingID=${listingID}`);
      }
    },
    [platform, router],
  );

  const handleActionVerificationAddressPopup = useCallback(() => {
    setOpenVerificationAddressPopup(false);

    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.MyRegisteredListingList) {
          router.push({
            pathname: `/${Routes.MyAddress}/${depth2}`,
            query: { ...query, origin: router.asPath },
          });
        } else {
          router.push({
            pathname: `/${depth1}/${Routes.MyAddress}`,
            query: { ...query, origin: router.asPath },
          });
        }
      } else {
        router.push({
          pathname: `/${Routes.MyAddress}`,
          query: { ...query, origin: router.asPath },
        });
      }
    }

    if (platform === 'mobile') {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
        query: {
          origin: router.asPath,
        },
      });
    }
  }, [platform, router]);

  const handleCloseVerificationAddressPopup = useCallback(() => {
    setOpenVerificationAddressPopup(false);
  }, []);

  const handleActionNeedMoreVerificationAddressPopup = useCallback(() => {
    setOpenNeedMoreVerificationAddressPopup(false);

    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.MyRegisteredListingList) {
          router.push({
            pathname: `/${Routes.MyAddress}/${depth2}`,
            query: { ...query, origin: router.asPath },
          });
        } else {
          router.push({
            pathname: `/${depth1}/${Routes.MyAddress}`,
            query: { ...query, origin: router.asPath },
          });
        }
      } else {
        router.push({
          pathname: `/${Routes.MyAddress}`,
          query: { ...query, origin: router.asPath },
        });
      }
    }

    if (platform === 'mobile') {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
        query: {
          origin: router.asPath,
        },
      });
    }
  }, [platform, router]);

  const handleCloseNeedMoreVerificationAddressPopup = useCallback(() => {
    setOpenNeedMoreVerificationAddressPopup(false);
  }, []);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Container>
        <RegisterdListingsHeader
          hasRegisteringListing={!!(tab === 1 && myRegisteringListingCount)}
          tabStatus={tab}
          isDeleteActive={isDeleteActive}
          isPopupActive={isPopupActive}
          handleClickBack={handleClickBack}
          handleDeleteListingList={handleDeleteListingList}
          handleActiveDelete={handleActiveDelete}
          handleCancelDelete={handleCancelDelete}
          handleOpenPopup={handleOpenPopup}
          handleClosePopup={handleClosePopup}
        />
        <RegisteredListingsTab
          value={tab}
          handleChange={handleChangeTab}
          myRegisteringListingCount={myRegisteringListingCount ?? 0}
          myActiveListingCount={myActiveListingCount ?? 0}
          myContractCompleteListingCount={myContractCompleteListingCount ?? 0}
          myCancelledListingCount={myCancelledListingCount ?? 0}
        />
        <RegisteredListingsList
          tab={tab}
          isDeleteActive={isDeleteActive}
          checkedListingIdList={checkedListingIdList}
          handleClickListingItem={handleClickListingItem}
          handleClickNavigateToListingCreate={handleNavigateToListingCreate}
          handleClickNavigateToListingDetailPassed={handleNavigateToListingDetailPassed}
          handleChangeCheckbox={handleChangeCheckbox}
          myRegisteringListingData={myRegisteringListingData}
          myRegisteringListingIncrementalPageNumber={myRegisteringListingIncrementalPageNumber}
          myActiveListingData={myActiveListingData}
          myActiveListingIncrementalPageNumber={myActiveListingIncrementalPageNumber}
          myContractCompleteListingData={myContractCompleteListingData}
          myContractCompleteListingIncrementalPageNumber={myContractCompleteListingIncrementalPageNumber}
          myCancelledListingData={myCancelledListingData}
          myCancelledListingIncrementalPageNumber={myCancelledListingIncrementalPageNumber}
        />
      </Container>

      {openVerificationAddressPopup && (
        <VerificationAddressPopup
          handleConfirm={handleActionVerificationAddressPopup}
          handleCancel={handleCloseVerificationAddressPopup}
        />
      )}

      {openNeedMoreVerificationAddressPopup && (
        <NeedMoreVerificationAddressPopup
          handleConfirm={handleActionNeedMoreVerificationAddressPopup}
          handleCancel={handleCloseNeedMoreVerificationAddressPopup}
        />
      )}
    </>
  );
}
