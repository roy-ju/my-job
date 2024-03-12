import React from 'react';

import tw from 'twin.macro';

import { InfiniteScroll } from '@/components/atoms';

import { IBiddingStatus } from '@/components/pages/pc/MyParticipatingListings/useMyParticipatingListings';

import MyListItem from '@/components/organisms/my/my-list-item';

import NoDataUI from './NoDataUI';

interface ListingRendererProps {
  tabStatus: number;
  biddingStatus: IBiddingStatus;
  onNavigateToListingDetailHistory: (listingId: number, biddingId: number) => () => void;
}

const Wrapper = tw.div`py-2`;
const Divider = tw.div`border-b border-gray-300 mx-5`;

enum BiddingStatus {
  Submitted = 1, // 제안중
  Accepted = 2, // 협의중
  PreContractCompleted = 3, // 거래성사
  Past = 4, // 지난거래
}

export default function ListingRenderer({
  onNavigateToListingDetailHistory,
  tabStatus,
  biddingStatus,
}: ListingRendererProps) {
  switch (tabStatus) {
    case BiddingStatus.Submitted: {
      if (!biddingStatus.submitted.count) return <NoDataUI tabStatus={1} />;

      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={biddingStatus.submitted.incrementalPageNumber}>
          <Wrapper>
            {biddingStatus.submitted.data?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing
                  showLikeButton={false}
                  onNavigateToListingDetailHistory={onNavigateToListingDetailHistory}
                  {...item}
                />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    }
    case BiddingStatus.Accepted: {
      if (!biddingStatus.accepted.count) return <NoDataUI tabStatus={2} />;

      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={biddingStatus.accepted.incrementalPageNumber}>
          <Wrapper>
            {biddingStatus.accepted.data?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing
                  showLikeButton={false}
                  onNavigateToListingDetailHistory={onNavigateToListingDetailHistory}
                  {...item}
                />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    }

    case BiddingStatus.PreContractCompleted: {
      if (!biddingStatus.preContractCompleted.count) return <NoDataUI tabStatus={3} />;

      return (
        <InfiniteScroll
          tw="flex-1 min-h-0 overflow-auto"
          onNext={biddingStatus.preContractCompleted.incrementalPageNumber}
        >
          <Wrapper>
            {biddingStatus.preContractCompleted.data?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing
                  showLikeButton={false}
                  showPopularityInformation={false}
                  onNavigateToListingDetailHistory={onNavigateToListingDetailHistory}
                  {...item}
                />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    }
    case BiddingStatus.Past: {
      if (!biddingStatus.past.count) return <NoDataUI tabStatus={3} />;

      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={biddingStatus.past.incrementalPageNumber}>
          <Wrapper>
            {biddingStatus.past.data?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing
                  showLikeButton={false}
                  showPopularityInformation={false}
                  onNavigateToListingDetailHistory={onNavigateToListingDetailHistory}
                  {...item}
                />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    }

    default:
      return <Wrapper />;
  }
}
