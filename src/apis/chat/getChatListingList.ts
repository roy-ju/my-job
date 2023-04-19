import { useMemo } from 'react';
import useSWR from 'swr';
import { useAuth } from '@/hooks/services';

export interface GetChatListingListResponse {
  list: {
    listing_id: number;
    buy_or_rent: number;
    trade_or_deposit_price: number;
    monthly_rent_fee: number;
    listing_title: string;
    jeonyong_area: string;
    thumbnail_full_path: string;
    floor_description: string;
    total_floor: string;
    direction: string;
  }[];
}

export default function useAPI_GetChatListingList(id: number) {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { data, isLoading, mutate } = useSWR<GetChatListingListResponse>(
    user ? ['/chat/room/listings', { chat_room_id: id }] : null,
  );

  const list = useMemo(
    () =>
      data?.list.map((item) => ({
        listingId: item.listing_id,
        buyOrRent: item.buy_or_rent,
        tradeOrDepositPrice: item.trade_or_deposit_price,
        monthlyRentFee: item.monthly_rent_fee,
        listingTitle: item.listing_title,
        jeonyongArea: item.jeonyong_area,
        thumbnailFullPath: item.thumbnail_full_path,
        floorDescription: item.floor_description,
        totalFloor: item.total_floor,
        direction: item.direction,
      })) ?? [],
    [data],
  );

  return { list, isLoading: isLoading || isLoadingUser, mutate };
}
