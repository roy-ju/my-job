import { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import { PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ListingCtaButtons } from '@/components/organisms';

import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';
import ShareIcon from '@/assets/icons/share.svg';
import { useRef, useState } from 'react';
import { useScroll } from '@/hooks/utils';
import tw from 'twin.macro';

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

  const [isHeaderActive, setIsHeaderActive] = useState(true);

  useScroll(scrollContainer, () => {
    setIsHeaderActive(true);
  });

  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader
        css={[
          tw`absolute top-0 left-0 w-full text-white transition-colors bg-transparent`,
          isHeaderActive && tw`bg-white text-gray-1000`,
        ]}
      >
        <NavigationHeader.Title tw="text-inherit">{listingDetail?.listing?.listing_title}</NavigationHeader.Title>
        <div tw="flex gap-4">
          <NavigationHeader.Button>
            <ShareIcon tw="text-inherit" />
          </NavigationHeader.Button>
          <NavigationHeader.Button>
            <HeartOutlinedIcon tw="text-inherit" />
          </NavigationHeader.Button>
        </div>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto" ref={scrollContainer}>
        {/* <div tw="w-full h-[256px] bg-gray-700 flex items-center justify-center font-bold">IMAGE SECTION</div> */}
        <div tw="h-[2000px]" />
      </div>
      <PersistentBottomBar>
        <ListingCtaButtons
          visitUserType={listingDetail?.visit_user_type ?? 0}
          buttonSize="bigger"
          onNavigateToParticipateBidding={onNavigateToParticipateBidding}
          onNavigateToUpdateBidding={onNavigateToUpdateBidding}
        />
      </PersistentBottomBar>
    </div>
  );
}
