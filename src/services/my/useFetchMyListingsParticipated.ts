import { useCallback, useMemo } from 'react';

import useSWRInfinite from 'swr/infinite';

import useAuth from '@/hooks/services/useAuth';

import { MyParticipatedListingListResponse } from './types';

function getKey(filter: number) {
  return (size: number, previousPageData: MyParticipatedListingListResponse) => {
    if (size > 0 && (previousPageData === null || previousPageData?.list?.length < 1)) return null;
    return ['/my/listings/participated', { page_number: size + 1, page_size: 10, filter }];
  };
}

export default function useFetchMyListingsParticipated(filter: number) {
  const { user } = useAuth();

  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<MyParticipatedListingListResponse>(user ? getKey(filter) : () => null);
  const count = dataList?.[0]?.count;
  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item.list)
      .filter((item) => Boolean(item))
      .flat()
      .map((item) => ({
        listingId: item.listing_id,
        thumbnailFullPath: item.thumbnail_full_path,
        listingTitle: item.listing_title,
        realestateType: item.realestate_type,
        jeonyongArea: item.jeonyong_area,
        floorDescription: item.floor_description,
        totalFloor: item.total_floor,
        direction: item.direction,
        buyOrRent: item.buy_or_rent,
        quickSale: item.quick_sale,
        isParticipating: item.is_participating,
        viewCount: item.view_count,
        participantsCount: item.participants_count,
        tradeOrDepositPrice: item.trade_or_deposit_price,
        monthlyRentFee: item.monthly_rent_fee,
        eubmyundong: item.eubmyundong,
        isFavorite: item.is_favorite,
        statusText: item.personal_status,
        biddingId: item.bidding_id,
        labelText: item.label_text,
      }));
  }, [dataList]);

  const incrementalPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return { count, data, pageNumber: size, isLoading, incrementalPageNumber, mutate };
}
