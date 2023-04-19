import { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import { PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ListingCtaButtons, PhotoHero } from '@/components/organisms';

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
  onNavigateToChatRoom?: () => void;
}

export default function ListingDetail({
  listingDetail,
  onNavigateToParticipateBidding,
  onNavigateToUpdateBidding,
  onNavigateToChatRoom,
}: ListingDetailProps) {
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const [isHeaderActive, setIsHeaderActive] = useState(false);

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsHeaderActive(scrollY > 0.1);
  });

  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader
        css={[
          tw`absolute top-0 left-0 z-50 w-full text-white transition-colors bg-transparent`,
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
        <PhotoHero itemSize={0} />
      </div>
      <PersistentBottomBar>
        <ListingCtaButtons
          visitUserType={listingDetail?.visit_user_type ?? 0}
          buttonSize="bigger"
          onNavigateToParticipateBidding={onNavigateToParticipateBidding}
          onNavigateToUpdateBidding={onNavigateToUpdateBidding}
          onNavigateToChatRoom={onNavigateToChatRoom}
        />
      </PersistentBottomBar>
    </div>
  );
}
