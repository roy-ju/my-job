import { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import { PersistentBottomBar, Separator } from '@/components/atoms';
import { Accordion, NavigationHeader, Tabs } from '@/components/molecules';
import { ListingCtaButtons, ListingDetailSection, PhotoHero } from '@/components/organisms';

import HeartFilledIcon from '@/assets/icons/heart.svg';
import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';
import ShareIcon from '@/assets/icons/share.svg';
import { useMemo, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect, useScroll } from '@/hooks/utils';
import tw from 'twin.macro';
import UserStatusStrings from './strings';

export interface ListingDetailProps {
  listingDetail?: GetListingDetailResponse | null;
  isLoading?: boolean;

  onClickFavorite?: () => void;
  onNavigateToParticipateBidding?: () => void;
  onNavigateToUpdateBidding?: () => void;
  onNavigateToChatRoom?: () => void;
}

export default function ListingDetail({
  listingDetail,
  onClickFavorite,
  onNavigateToParticipateBidding,
  onNavigateToUpdateBidding,
  onNavigateToChatRoom,
}: ListingDetailProps) {
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const [userStatusAccordion, setUserStatusAccordion] = useState<HTMLDivElement | null>(null);

  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isTopCtaButtonsVisible, setIsTopCtaButtonsVisible] = useState(true);

  const biddingsChatRoomCreated = useMemo(
    () =>
      listingDetail?.biddings_chat_room_created?.map((item) => ({
        nickname: item.nickname,
        createdTime: item.created_time,
        price: item.trade_or_deposit_price,
        monthlyRentFee: item.monthly_rent_fee,
        isMyBidding: item.is_my_bidding,
      })),
    [listingDetail?.biddings_chat_room_created],
  );

  const biddingsChatRoomNotCreated = useMemo(
    () =>
      listingDetail?.biddings_chat_room_not_created?.map((item) => ({
        nickname: item.nickname,
        createdTime: item.created_time,
        price: item.trade_or_deposit_price,
        monthlyRentFee: item.monthly_rent_fee,
        isMyBidding: item.is_my_bidding,
      })),
    [listingDetail?.biddings_chat_room_not_created],
  );

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsHeaderActive(scrollY > 0.1);
  });

  useIsomorphicLayoutEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsTopCtaButtonsVisible(entry.isIntersecting);
    });

    if (userStatusAccordion) {
      observer.observe(userStatusAccordion);
    }
    return () => {
      observer.disconnect();
    };
  }, [userStatusAccordion]);

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
          <NavigationHeader.Button onClick={onClickFavorite}>
            {listingDetail?.is_favorite ? <HeartFilledIcon tw="text-red" /> : <HeartOutlinedIcon tw="text-inherit" />}
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
            quickSale={listingDetail?.listing?.quick_sale}
            quickSaleComparative={listingDetail?.listing?.quick_sale_comparative}
          />
        </div>
        {Object.keys(UserStatusStrings).includes(`${listingDetail?.visit_user_type}`) && (
          <div>
            <Separator />
            <Accordion defaultExpanded>
              <Accordion.Summary tw="h-14 px-5 font-bold">
                {UserStatusStrings[listingDetail?.visit_user_type ?? 0]?.title}
              </Accordion.Summary>
              <Accordion.Details tw="pt-1 pb-6 px-5 text-b2 text-gray-700 whitespace-pre-wrap">
                {UserStatusStrings[listingDetail?.visit_user_type ?? 0]?.title}
                <div tw="mt-5" ref={setUserStatusAccordion}>
                  <ListingCtaButtons
                    visitUserType={listingDetail?.visit_user_type ?? 0}
                    buttonSize="big"
                    onNavigateToParticipateBidding={onNavigateToParticipateBidding}
                    onNavigateToUpdateBidding={onNavigateToUpdateBidding}
                    onNavigateToChatRoom={onNavigateToChatRoom}
                  />
                </div>
              </Accordion.Details>
            </Accordion>
          </div>
        )}
        <Separator />
        <div tw="sticky top-8 pt-6">
          <Tabs>
            <Tabs.Tab value={0}>
              <span tw="text-b2">거래정보</span>
            </Tabs.Tab>
            <Tabs.Tab value={1}>
              <span tw="text-b2">단지정보</span>
            </Tabs.Tab>
            <Tabs.Tab value={2}>
              <span tw="text-b2">Q&A</span>
            </Tabs.Tab>
            <Tabs.Indicator />
          </Tabs>
        </div>
        <div tw="px-5 pt-6 pb-10">
          <ListingDetailSection.Biddings
            showBiddingPrice={listingDetail?.is_owner ?? false}
            biddingsChatRoomCreated={biddingsChatRoomCreated}
            biddingsChatRoomNotCreated={biddingsChatRoomNotCreated}
          />
        </div>
        <Separator />
        <div tw="py-10 px-5">
          <ListingDetailSection.Conditions listing={listingDetail?.listing} />
        </div>
      </div>
      {!isTopCtaButtonsVisible && (
        <PersistentBottomBar>
          <ListingCtaButtons
            visitUserType={listingDetail?.visit_user_type ?? 0}
            buttonSize="bigger"
            onNavigateToParticipateBidding={onNavigateToParticipateBidding}
            onNavigateToUpdateBidding={onNavigateToUpdateBidding}
            onNavigateToChatRoom={onNavigateToChatRoom}
          />
        </PersistentBottomBar>
      )}
    </div>
  );
}
