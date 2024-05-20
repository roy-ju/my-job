/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { KeyedMutator } from 'swr';

import axios from 'axios';

import { toast } from 'react-toastify';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import useAuth from '@/hooks/services/useAuth';

import { apiService } from '@/services';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import { ListingDetailResponse } from '@/services/listing/types';
import useCheckPlatform from '@/hooks/useCheckPlatform';

export default function useFavroriteHandler({
  data,
  mutateListing,
}: {
  data?: ListingDetailResponse & ErrorResponse;
  mutateListing: KeyedMutator<ListingDetailResponse & ErrorResponse>;
}) {
  const { user } = useAuth();

  const { platform } = useCheckPlatform();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const router = useRouter();

  const handleClickFavoritePc = useCallback(async () => {
    if (!user) {
      openAuthPopup('onlyLogin');
      handleUpdateReturnUrl();
      return;
    }

    async function removeFavoriteOptimistic() {
      if (data?.listing?.id) {
        await apiService.removeListingFavorite({ listing_id: data.listing.id });
        const { data: updatedData } = await axios.post('/listing/detail', { listing_id: data.listing.id });
        return updatedData;
      }
    }
    async function addFavoriteOptimistic() {
      if (data?.listing?.id) {
        await apiService.addListingFavorite({ listing_id: data.listing.id });
        const { data: updatedData } = await axios.post('/listing/detail', { listing_id: data.listing.id });
        return updatedData;
      }
    }

    if (data?.listing?.id) {
      if (data.is_favorite) {
        await mutateListing(removeFavoriteOptimistic, {
          optimisticData: { ...data, is_favorite: false },
          rollbackOnError: true,
        });

        toast.success('관심 매물을 해제하셨습니다.');
      } else {
        await mutateListing(addFavoriteOptimistic, {
          optimisticData: { ...data, is_favorite: true },
          rollbackOnError: true,
        });

        toast.success('관심 매물에 추가되었습니다.');
      }
    }
  }, [user, data, openAuthPopup, handleUpdateReturnUrl, mutateListing]);

  const handleClickFavoriteMobile = useCallback(async () => {
    if (inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!user) {
      openAuthPopup('onlyLogin');
      handleUpdateReturnUrl();
      return;
    }

    async function removeFavoriteOptimistic() {
      if (data?.listing?.id) {
        await apiService.removeListingFavorite({ listing_id: data.listing.id });

        const { data: updatedData } = await axios.post('/listing/detail', { listing_id: data.listing.id });
        return updatedData;
      }
    }

    async function addFavoriteOptimistic() {
      if (data?.listing?.id) {
        await apiService.addListingFavorite({ listing_id: data.listing.id });

        const { data: updatedData } = await axios.post('/listing/detail', { listing_id: data.listing.id });
        return updatedData;
      }
    }

    if (data?.listing?.id) {
      if (data.is_favorite) {
        await mutateListing(removeFavoriteOptimistic, {
          optimisticData: { ...data, is_favorite: false },
          rollbackOnError: true,
        });

        toast.success('관심 매물을 해제하셨습니다.');
      } else {
        await mutateListing(addFavoriteOptimistic, {
          optimisticData: { ...data, is_favorite: true },
          rollbackOnError: true,
        });
        toast.success('관심 매물에 추가되었습니다.');
      }
    }
  }, [data, mutateListing, user, router]);

  return { handleClickFavorite: platform === 'pc' ? handleClickFavoritePc : handleClickFavoriteMobile };
}
