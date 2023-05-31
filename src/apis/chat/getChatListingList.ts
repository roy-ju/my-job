import { useMemo } from 'react';
import useSWR from 'swr';
import { useAuth } from '@/hooks/services';

interface Listing {
  listing_id: number;
  bidding_id: number;
  listing_status: number;
  buy_or_rent: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  listing_title: string;
  jeonyong_area: string;
  thumbnail_full_path: any;
  floor_description: string;
  total_floor: string;
  direction: string;
  label_text: string;
}

export interface GetChatListingListResponse {
  seller_list: Listing[];
  buyer_contract_list: Listing[];
  buyer_active_list: Listing[];
}

export default function useAPI_GetChatListingList(id: number) {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { data, isLoading, mutate } = useSWR<GetChatListingListResponse>(
    user && id ? ['/chat/room/listings', { chat_room_id: id }] : null,
  );

  const sellerList = useMemo(
    () =>
      data?.seller_list?.map((item) => ({
        listingId: item.listing_id,
        listingStatus: item.listing_status,
        biddingId: item.bidding_id,
        buyOrRent: item.buy_or_rent,
        tradeOrDepositPrice: item.trade_or_deposit_price,
        monthlyRentFee: item.monthly_rent_fee,
        listingTitle: item.listing_title,
        jeonyongArea: item.jeonyong_area,
        thumbnailFullPath: item.thumbnail_full_path,
        floorDescription: item.floor_description,
        totalFloor: item.total_floor,
        direction: item.direction,
        labelText: item.label_text,
      })) ?? [],
    [data?.seller_list],
  );

  const buyerContractList = useMemo(
    () =>
      data?.buyer_contract_list?.map((item) => ({
        listingId: item.listing_id,
        listingStatus: item.listing_status,
        biddingId: item.bidding_id,
        buyOrRent: item.buy_or_rent,
        tradeOrDepositPrice: item.trade_or_deposit_price,
        monthlyRentFee: item.monthly_rent_fee,
        listingTitle: item.listing_title,
        jeonyongArea: item.jeonyong_area,
        thumbnailFullPath: item.thumbnail_full_path,
        floorDescription: item.floor_description,
        totalFloor: item.total_floor,
        direction: item.direction,
        labelText: item.label_text,
      })) ?? [],
    [data?.buyer_contract_list],
  );

  const buyerActiveList = useMemo(
    () =>
      data?.buyer_active_list?.map((item) => ({
        listingId: item.listing_id,
        listingStatus: item.listing_status,
        biddingId: item.bidding_id,
        buyOrRent: item.buy_or_rent,
        tradeOrDepositPrice: item.trade_or_deposit_price,
        monthlyRentFee: item.monthly_rent_fee,
        listingTitle: item.listing_title,
        jeonyongArea: item.jeonyong_area,
        thumbnailFullPath: item.thumbnail_full_path,
        floorDescription: item.floor_description,
        totalFloor: item.total_floor,
        direction: item.direction,
        labelText: item.label_text,
      })) ?? [],
    [data?.buyer_active_list],
  );

  return { sellerList, buyerContractList, buyerActiveList, isLoading: isLoading || isLoadingUser, mutate };
}
