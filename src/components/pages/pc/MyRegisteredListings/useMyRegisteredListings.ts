import useAPI_GetMyRegisteredListingList from '@/apis/my/getMyRegisteredListingList';
import { useState } from 'react';
import deleteMyListing from '@/apis/my/deleteMyListing';

export default function useMyRegisteredListings() {
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [checkedListingIdList, setCheckedListingIdList] = useState<number[]>([]);

  const {
    count: myRegisteringListingCount,
    data: myRegisteringListingData,
    incrementalPageNumber: myRegisteringListingIncrementalPageNumber,
    mutate: myRegisteringListingMutate,
    isLoading: myRegisteringListingIsLoading,
  } = useAPI_GetMyRegisteredListingList(1);
  const {
    count: myActiveListingCount,
    data: myActiveListingData,
    incrementalPageNumber: myActiveListingIncrementalPageNumber,
    mutate: myActiveListingMutate,
    isLoading: myActiveListingIsLoading,
  } = useAPI_GetMyRegisteredListingList(2);
  const {
    count: myContractCompleteListingCount,
    data: myContractCompleteListingData,
    incrementalPageNumber: myContractCompleteListingIncrementalPageNumber,
    mutate: myContractCompleteListingMutate,
    isLoading: myContractCompleteListingIsLoading,
  } = useAPI_GetMyRegisteredListingList(3);
  const {
    count: myCancelledListingCount,
    data: myCancelledListingData,
    incrementalPageNumber: myCancelledListingIncrementalPageNumber,
    mutate: myCancelledListingMutate,
    isLoading: myCancelledListingIsLoading,
  } = useAPI_GetMyRegisteredListingList(4);

  const handleChangeCheckbox = (listingId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedListingIdList([...checkedListingIdList, listingId]);
    } else {
      setCheckedListingIdList(checkedListingIdList.filter((id) => id !== listingId));
    }
  };

  const handleDeleteListingList = async () => {
    await Promise.all(
      checkedListingIdList?.map(async (listingId) => {
        deleteMyListing({ listing_id: listingId });
      }),
    );
    await myRegisteringListingMutate();
    setIsDeleteActive(false);
    setIsPopupActive(false);
  };

  const handleActiveDelete = () => {
    setIsDeleteActive(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteActive(false);
    setCheckedListingIdList([]);
  };

  const handleOpenPopup = () => {
    setIsPopupActive(true);
  };

  const handleClosePopup = () => {
    setIsPopupActive(false);
  };

  return {
    myRegisteringListingCount,
    myRegisteringListingData,
    myRegisteringListingIncrementalPageNumber,
    myRegisteringListingMutate,
    myRegisteringListingIsLoading,

    myActiveListingCount,
    myActiveListingData,
    myActiveListingIncrementalPageNumber,
    myActiveListingMutate,
    myActiveListingIsLoading,

    myContractCompleteListingCount,
    myContractCompleteListingData,
    myContractCompleteListingIncrementalPageNumber,
    myContractCompleteListingMutate,
    myContractCompleteListingIsLoading,

    myCancelledListingCount,
    myCancelledListingData,
    myCancelledListingIncrementalPageNumber,
    myCancelledListingMutate,
    myCancelledListingIsLoading,

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
