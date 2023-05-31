import { NavigationHeader } from '@/components/molecules';
import ExclamationIcon from '@/assets/icons/exclamation_mark.svg';
import { InfiniteScroll, Loading } from '@/components/atoms';
import { MapSearchListResponse } from '@/apis/map/mapSearchList';
import { MyListItem } from '@/components/organisms';
import { AnimatePresence, motion } from 'framer-motion';
import { DefaultListingImage } from '@/constants/strings';
import tw from 'twin.macro';
import React from 'react';

function NoData() {
  return (
    <div tw="py-12">
      <div tw="flex justify-center">
        <ExclamationIcon />
      </div>
      <div tw="mt-4 text-center text-gray-700 text-info">
        조건에 맞는 매물이 없습니다.
        <br />
        지도를 이동하거나 필터를 변경해보세요.
      </div>
    </div>
  );
}

const Divider = tw.div`border-b border-gray-300 mx-5`;

interface Props {
  isLoading?: boolean;
  data?: MapSearchListResponse['list'];
  onClickListing?: (id: number) => void;
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
              <NoData />
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
                      onClickListingItem={(id) => () => {
                        onClickListing?.(id);
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
