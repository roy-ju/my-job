import { useCallback, useMemo } from 'react';

import useAuth from '@/hooks/services/useAuth';

import useSWRInfinite from 'swr/infinite';

import { MyListingsRegisteredListResponse } from './types';

function getKey(filter: number) {
  return (size: number, previousPageData: MyListingsRegisteredListResponse) => {
    if (size > 0 && (previousPageData === null || previousPageData?.list?.length < 1)) return null;
    return ['/my/listings/registered', { page_number: size + 1, page_size: 10, filter }];
  };
}

export default function useFetchMyListingsRegistered(filter: number) {
  const { user } = useAuth();

  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<MyListingsRegisteredListResponse>(user ? getKey(filter) : () => null);

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
        statusText: item.status_text,
        labelText: item.label_text,
      }));
  }, [dataList]);

  const incrementalPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return { count, data, pageNumber: size, isLoading, incrementalPageNumber, mutate };
}
