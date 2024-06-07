import React from 'react';

import tw from 'twin.macro';

import { AnimatePresence, motion } from 'framer-motion';

import { InfiniteScroll, Loading } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import MyListItem from '@/components/organisms/my/my-list-item';

import { MapSearchListResponse } from '@/services/map/types';

import { DefaultListingImage } from '@/constants/strings';

import Nodata from './map-listings-list/Nodata';

const Divider = tw.div`border-b border-gray-300 mx-5`;

interface Props {
  isLoading?: boolean;
  data?: MapSearchListResponse['list'];
  onClickListing?: (id: number, buyOrRent: number) => void;
  onToggleFavorite?: (id: number, active: boolean) => void;
  onClickBack?: () => void;
  onNext?: () => void;
}

export default function MapListingList({
  data,
  isLoading,
  onClickListing,
  onToggleFavorite,
  onClickBack,
  onNext,
}: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>매물 목록</NavigationHeader.Title>
      </NavigationHeader>
      <AnimatePresence mode="wait">
        <div tw="flex-1 min-h-0 overflow-auto">
          {isLoading && (
            <motion.div tw="py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
              <Loading />
            </motion.div>
          )}
          {!isLoading && data?.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
              <Nodata />
            </motion.div>
          )}
          {!isLoading && Boolean(data?.length) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
              <InfiniteScroll onNext={onNext}>
                {data?.map((item, i) => (
                  <React.Fragment key={item.listing_id}>
                    {i > 0 && <Divider />}
                    <MyListItem.Listing
                      listingId={item.listing_id}
                      listingTitle={item.listing_title}
                      tradeOrDepositPrice={item.trade_or_deposit_price}
                      monthlyRentFee={item.monthly_rent_fee}
                      realestateType={item.realestate_type}
                      jeonyongArea={item.jeonyong_area}
                      totalFloor={item.total_floor}
                      quickSale={item.quick_sale ?? false}
                      isParticipating={item.is_participating}
                      participantsCount={item.participants_count}
                      isFavorite={item.is_favorite}
                      eubmyundong={item.eubmyundong}
                      labelText={item.label_text}
                      viewCount={item.view_count}
                      thumbnailFullPath={item.thumbnail_full_path ?? DefaultListingImage[item.realestate_type]}
                      buyOrRent={item.buy_or_rent}
                      floorDescription={item.floor_description}
                      direction={item.direction}
                      statusText=""
                      onClickListingItem={(id, bor) => () => {
                        onClickListing?.(id, bor);
                      }}
                      onToggleListingLike={onToggleFavorite}
                    />
                  </React.Fragment>
                ))}
              </InfiniteScroll>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
