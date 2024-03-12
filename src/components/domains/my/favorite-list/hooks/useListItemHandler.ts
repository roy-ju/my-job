import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { KeyedMutator } from 'swr';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import { MyFavoriteDanjiListResponse, MyFavoriteListingListResponse } from '@/services/my/types';

export default function useListItemHandler({
  mutateMyFavoriteListings,
  mutateMyFavoriteDanjis,
}: {
  mutateMyFavoriteListings?: KeyedMutator<MyFavoriteListingListResponse[]>;
  mutateMyFavoriteDanjis?: KeyedMutator<MyFavoriteDanjiListResponse[]>;
}) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickFavoriteDanjiItem = (danjiID: number) => () => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      router.push({
        pathname: `/${depth1}/${Routes.DanjiDetail}`,
        query: {
          ...query,
          danjiID: `${danjiID}`,
        },
      });
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${danjiID}`);
    }
  };

  const handleClickFavoriteListingItem = (listingId: number) => () => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      router.push({
        pathname: `/${depth1}/${Routes.ListingDetail}`,
        query: {
          ...query,
          listingID: `${listingId}`,
        },
      });
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingId}`);
    }
  };

  const handleToggleListingLike = useCallback(
    async (id: number, isListingFavorite: boolean) => {
      if (!isListingFavorite) {
        await apiService.addListingFavorite({ listing_id: id });
      } else {
        await apiService.removeListingFavorite({ listing_id: id });
      }

      mutateMyFavoriteListings?.();
    },
    [mutateMyFavoriteListings],
  );

  const handleToggleDanjiLike = useCallback(
    async (danjiID: number, realestateType: number, isDanjiFavorite: boolean) => {
      if (!isDanjiFavorite) {
        await apiService.addDanjiFavorite({ id: danjiID, type: realestateType });
      } else {
        await apiService.removeDanjiFavorite({ id: danjiID, type: realestateType });
      }

      mutateMyFavoriteDanjis?.();
    },
    [mutateMyFavoriteDanjis],
  );

  return {
    handleToggleDanjiLike,
    handleToggleListingLike,
    handleClickFavoriteDanjiItem,
    handleClickFavoriteListingItem,
  };
}
