import useAuth from '@/hooks/services/useAuth';
import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export interface IMyRegisteredListingListItem {
  listing_id: number;
  thumbnail_full_path: string;
  listing_title: string;
  realestate_type: number;
  jeonyong_area: string;
  floor_description: string;
  total_floor: string;
  direction: string;
  buy_or_rent: number;
  quick_sale: boolean;
  is_participating: boolean;
  view_count: number;
  participants_count: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  eubmyundong: string;
  is_favorite: boolean;
  status_text: string;
  label_text: string;
}

export interface GetMyRegisteredListingListResponse {
  count: number;
  list: IMyRegisteredListingListItem[];
}

function getKey(filter: number) {
  return (size: number, previousPageData: GetMyRegisteredListingListResponse) => {
    if (size > 0 && (previousPageData === null || previousPageData?.list?.length < 1)) return null;
    return ['/my/listings/registered', { page_number: size + 1, page_size: 10, filter }];
  };
}

export default function useAPI_GetMyRegisteredListingList(filter: number) {
  const { user } = useAuth();
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<GetMyRegisteredListingListResponse>(user ? getKey(filter) : () => null);
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
