import { useCallback, useMemo, useState } from 'react';
import addMyFavoriteListing from '@/apis/my/addMyFavoriteListing';
import addMyFavoriteDanji from '@/apis/my/addMyFavoriteDanji';
import deleteMyFavoriteDanji from '@/apis/my/deleteMyFavoriteDanji';
import deleteMyFavoriteListing from '@/apis/my/deleteMyFavoriteListing';
import useAPI_GetMyFavoriteDanjiList from '@/apis/my/getMyFavoriteDanjiList';
import useAPI_GetMyFavoriteListingList from '@/apis/my/getMyFavoriteListingList';

export default function useMyFavoriteList() {
  const [listingSortingType, setListingSortingType] = useState('등록일순');

  const convertListingSortingType = useCallback(() => {
    switch (listingSortingType) {
      case '등록일순':
        return 1;
      case '조회순':
        return 2;
      case '참여자순':
        return 3;
      default:
        return 1;
    }
  }, [listingSortingType]);

  const {
    count: danjiFavoriteCount,
    data: danjis,
    incrementalPageNumber: danjiIncrementalPageNumber,
    mutate: danjiMutate,
    isLoading: isDanjiLoading,
  } = useAPI_GetMyFavoriteDanjiList();

  const {
    count: ListingFavoriteCount,
    data: listings,
    incrementalPageNumber: listingIncrementalPageNumber,
    mutate: listingMutate,
    isLoading: isListingLoading,
  } = useAPI_GetMyFavoriteListingList(convertListingSortingType());

  const handleToggleListingLike = useCallback(
    async (id: number, isListingFavorite: boolean) => {
      if (isListingFavorite) {
        await deleteMyFavoriteListing({ listing_id: id });
      } else {
        await addMyFavoriteListing({ listing_id: id });
      }
      listingMutate();
    },
    [listingMutate],
  );

  const handleChangeListingSortingType = useCallback((newValue: string) => {
    setListingSortingType(newValue);
  }, []);

  const handleToggleDanjiLike = useCallback(
    async (pnu: string, realestateType: number, isDanjiFavorite: boolean) => {
      if (isDanjiFavorite) {
        await deleteMyFavoriteDanji({ pnu, realestate_type: realestateType });
      } else {
        await addMyFavoriteDanji({ pnu, realestate_type: realestateType });
      }
      danjiMutate();
    },
    [danjiMutate],
  );

  const danjiList = useMemo(
    () =>
      danjis.map((item) => ({
        danjiId: item.danji_id,
        pnu: item.pnu,
        realestateType: item.realestate_type,
        eubmyundong: item.eubmyundong,
        danjiName: item.danji_name,
        roadNameAddress: item.road_name_address,
        totalSaedaeCount: item.total_saedae_count,
        year: item.year,
        month: item.month,
        day: item.day,
        jeonyongMin: item.jeonyong_min,
        jeonyongMax: item.jeonyong_max,
        buyCount: item.buy_count,
        jeonsaeCount: item.jeonsae_count,
        wolsaeCount: item.wolsae_count,
        isFavorite: item.is_favorite,
        dongCount: item.dong_count,
      })),
    [danjis],
  );

  const listingList = useMemo(
    () =>
      listings.map((item) => ({
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
      })),
    [listings],
  );

  return {
    ListingFavoriteCount,
    danjiFavoriteCount,
    listingList,
    danjiList,
    handleToggleListingLike,
    handleToggleDanjiLike,
    listingIncrementalPageNumber,
    danjiIncrementalPageNumber,
    listingSortingType,
    handleChangeListingSortingType,
    isDanjiLoading,
    isListingLoading,
  };
}
