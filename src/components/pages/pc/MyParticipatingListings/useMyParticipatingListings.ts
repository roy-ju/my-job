import { MyFavoriteListingListUiItem } from '@/components/domains/my/favorite-list/types';

import useFetchMyListingsParticipated from '@/services/my/useFetchMyListingsParticipated';

interface IBiddingStatusItem {
  count?: number;
  data?: MyFavoriteListingListUiItem[];
  incrementalPageNumber?: () => void;
  mutate?: () => void;
  isLoading?: boolean;
}
export interface IBiddingStatus {
  submitted: IBiddingStatusItem;
  accepted: IBiddingStatusItem;
  preContractCompleted: IBiddingStatusItem;
  past: IBiddingStatusItem;
}

export default function useMyParticipatingListings() {
  const biddingStatus: IBiddingStatus = {
    submitted: { count: 0, data: [], incrementalPageNumber: () => {}, mutate: () => {}, isLoading: true },
    accepted: { count: 0, data: [], incrementalPageNumber: () => {}, mutate: () => {}, isLoading: true },
    preContractCompleted: { count: 0, data: [], incrementalPageNumber: () => {}, mutate: () => {}, isLoading: true },
    past: { count: 0, data: [], incrementalPageNumber: () => {}, mutate: () => {}, isLoading: true },
  };

  const biddingSubmittedData = useFetchMyListingsParticipated(1);

  biddingStatus.submitted = {
    count: biddingSubmittedData.count,
    data: biddingSubmittedData.data,
    incrementalPageNumber: biddingSubmittedData.incrementalPageNumber,
    mutate: biddingSubmittedData.mutate,
    isLoading: biddingSubmittedData.isLoading,
  };

  const biddingAcceptedData = useFetchMyListingsParticipated(2);

  biddingStatus.accepted = {
    count: biddingAcceptedData.count,
    data: biddingAcceptedData.data,
    incrementalPageNumber: biddingAcceptedData.incrementalPageNumber,
    mutate: biddingAcceptedData.mutate,
    isLoading: biddingAcceptedData.isLoading,
  };

  const biddingPreContractCompletedData = useFetchMyListingsParticipated(3);

  biddingStatus.preContractCompleted = {
    count: biddingPreContractCompletedData.count,
    data: biddingPreContractCompletedData.data,
    incrementalPageNumber: biddingPreContractCompletedData.incrementalPageNumber,
    mutate: biddingPreContractCompletedData.mutate,
    isLoading: biddingPreContractCompletedData.isLoading,
  };

  const biddingPastData = useFetchMyListingsParticipated(4);

  biddingStatus.past = {
    count: biddingPastData.count,
    data: biddingPastData.data,
    incrementalPageNumber: biddingPastData.incrementalPageNumber,
    mutate: biddingPastData.mutate,
    isLoading: biddingPastData.isLoading,
  };

  const isLoading =
    biddingStatus.accepted.isLoading &&
    biddingStatus.past.isLoading &&
    biddingStatus.preContractCompleted.isLoading &&
    biddingStatus.submitted.isLoading;

  return { biddingStatus, isLoading };
}
