import { useCallback, useEffect, useState } from 'react';

import { mutate } from 'swr';

import { toast } from 'react-toastify';

import useFetchMyListingsRegistered from '@/services/my/useFetchMyListingsRegistered';

import { apiService } from '@/services';

export default function useMyRegisteredListings() {
  const [isLoading, setIsLoading] = useState(false);

  const [isDeleteActive, setIsDeleteActive] = useState(false);

  const [isPopupActive, setIsPopupActive] = useState(false);

  const [checkedListingIdList, setCheckedListingIdList] = useState<number[]>([]);

  const {
    count: myRegisteringListingCount,
    data: myRegisteringListingData,
    incrementalPageNumber: myRegisteringListingIncrementalPageNumber,
    mutate: myRegisteringListingMutate,
    isLoading: myRegisteringListingIsLoading,
  } = useFetchMyListingsRegistered(1);

  const {
    count: myActiveListingCount,
    data: myActiveListingData,
    incrementalPageNumber: myActiveListingIncrementalPageNumber,
    mutate: myActiveListingMutate,
    isLoading: myActiveListingIsLoading,
  } = useFetchMyListingsRegistered(2);
  const {
    count: myContractCompleteListingCount,
    data: myContractCompleteListingData,
    incrementalPageNumber: myContractCompleteListingIncrementalPageNumber,
    mutate: myContractCompleteListingMutate,
    isLoading: myContractCompleteListingIsLoading,
  } = useFetchMyListingsRegistered(3);
  const {
    count: myCancelledListingCount,
    data: myCancelledListingData,
    incrementalPageNumber: myCancelledListingIncrementalPageNumber,
    mutate: myCancelledListingMutate,
    isLoading: myCancelledListingIsLoading,
  } = useFetchMyListingsRegistered(4);

  const handleChangeCheckbox = useCallback(
    (listingId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;

      if (checked) {
        setCheckedListingIdList([...checkedListingIdList, listingId]);
      } else {
        setCheckedListingIdList(checkedListingIdList.filter((id) => id !== listingId));
      }
    },
    [checkedListingIdList],
  );

  const handleDeleteListingList = useCallback(async () => {
    await Promise.all(checkedListingIdList?.map((listingId) => apiService.deleteMyListing({ listing_id: listingId })));

    await myRegisteringListingMutate();
    await mutate('/my/dashboard/info');

    toast.success('매물을 삭제했습니다.', { toastId: 'successDelete' });
    setIsDeleteActive(false);
    setIsPopupActive(false);
  }, [checkedListingIdList, myRegisteringListingMutate]);

  const handleActiveDelete = useCallback(() => {
    setIsDeleteActive(true);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setIsDeleteActive(false);
    setCheckedListingIdList([]);
  }, []);

  const handleOpenPopup = useCallback(() => {
    if (!checkedListingIdList.length) return;

    setIsPopupActive(true);
  }, [checkedListingIdList.length]);

  const handleClosePopup = useCallback(() => {
    setIsPopupActive(false);
  }, []);

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

  return {
    myRegisteringListingCount,
    myRegisteringListingData,
    myRegisteringListingIncrementalPageNumber,
    myRegisteringListingMutate,

    myActiveListingCount,
    myActiveListingData,
    myActiveListingIncrementalPageNumber,
    myActiveListingMutate,

    myContractCompleteListingCount,
    myContractCompleteListingData,
    myContractCompleteListingIncrementalPageNumber,
    myContractCompleteListingMutate,

    myCancelledListingCount,
    myCancelledListingData,
    myCancelledListingIncrementalPageNumber,
    myCancelledListingMutate,

    isLoading,

    isDeleteActive,
    isPopupActive,

    handleDeleteListingList,
    handleActiveDelete,
    handleCancelDelete,
    handleOpenPopup,
    handleClosePopup,

    checkedListingIdList,
    handleChangeCheckbox,
  };
}
