import { FavoriteListingListItem } from '@/services/my/types';

export default function convertedListingsList(list: FavoriteListingListItem[]) {
  return list.map((item) => ({
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
    labelText: item.label_text,
    statusText: item.status_text,
  }));
}
