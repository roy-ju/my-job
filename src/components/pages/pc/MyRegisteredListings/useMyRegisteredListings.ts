import useAPI_GetMyRegisteredListingList from '@/apis/my/getMyRegisteredListingList';

export default function useMyRegisteredListings() {
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
  };
}
