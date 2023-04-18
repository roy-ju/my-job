import { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import { PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ListingCtaButtons } from '@/components/organisms';

import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';
import ShareIcon from '@/assets/icons/share.svg';
import { useRef } from 'react';

export interface ListingDetailProps {
  listingDetail?: GetListingDetailResponse | null;
  isLoading?: boolean;

  onNavigateToParticipateBidding?: () => void;
  onNavigateToUpdateBidding?: () => void;
}

export default function ListingDetail({
  listingDetail,
  onNavigateToParticipateBidding,
  onNavigateToUpdateBidding,
}: ListingDetailProps) {
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader tw="bg-transparent w-full absolute top-0 left-0">
        <NavigationHeader.Title tw="text-white">{listingDetail?.listing?.listing_title}</NavigationHeader.Title>
        <div tw="flex gap-4">
          <NavigationHeader.Button>
            <ShareIcon tw="text-white" />
          </NavigationHeader.Button>
          <NavigationHeader.Button>
            <HeartOutlinedIcon tw="text-white" />
          </NavigationHeader.Button>
        </div>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto" ref={scrollContainer}>
        <div tw="w-full h-[256px] bg-red" />
        <div tw="h-[2000px]" />
      </div>
      <PersistentBottomBar>
        <ListingCtaButtons
          visitUserType={listingDetail?.visit_user_type ?? 0}
          buttonSize="bigger"
          onNavigateToParticipateBidding={onNavigateToParticipateBidding}
          onNavigateToUpdateBidding={onNavigateToUpdateBidding}
          onNavigateToUpdateRejectedBidding={onNavigateToUpdateBidding}
        />
      </PersistentBottomBar>
    </div>
  );
}
