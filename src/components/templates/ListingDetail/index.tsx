import { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import { PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ListingCtaButtons, ListingDetailSection, PhotoHero } from '@/components/organisms';

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
        <PhotoHero
          itemSize={listingDetail?.photos?.length ?? 0}
          photoPath={listingDetail?.photos?.[0]?.full_file_path}
        />
        <div tw="px-5 py-6">
          <ListingDetailSection.Summary
            createdTime={listingDetail?.active_status_time}
            viewCount={listingDetail?.listing?.view_count}
            participatorCount={listingDetail?.participator_count}
            listingTitle={listingDetail?.listing?.listing_title}
            address={listingDetail?.display_address}
            buyOrRent={listingDetail?.listing?.buy_or_rent}
            price={listingDetail?.trade_or_deposit_price}
            monthlyRentFee={listingDetail?.monthly_rent_fee}
            realestateType={listingDetail?.listing?.realestate_type}
            jeonyongArea={listingDetail?.listing?.jeonyong_area}
            gonggeupArea={listingDetail?.listing?.gonggeup_area}
            floor={listingDetail?.listing?.floor}
            floorDescription={listingDetail?.listing?.floor_description}
            direction={listingDetail?.listing?.direction}
            tags={listingDetail?.tags?.map((tag) => tag.name)}
          />
        </div>
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
