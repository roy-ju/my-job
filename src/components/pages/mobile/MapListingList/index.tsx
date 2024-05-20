import { memo, useCallback } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { MobileContainer } from '@/components/atoms';

import { MapListingList } from '@/components/templates';

import useAuth from '@/hooks/services/useAuth';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import useMapListingList from './useMapListingList';

export default memo(() => {
  const router = useRouter();

  const { data, isLoading, increamentPageNumber, mutate } = useMapListingList();

  const { user, isLoading: isAuthLoading } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const onClickListing = useCallback(
    (id: number, buyOrRent: number) => {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.ListingDetail}`,
          query: {
            listingID: `${id}`,
            bor: `${buyOrRent}`,
          },
        },
        `/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${id}`,
      );
    },
    [router],
  );

  const onToggleFav = useCallback(
    async (id: number, active: boolean) => {
      if (inAppInfo.isInAppBrowser) {
        handleOpenAppInstallPopup();
        return;
      }

      if (isAuthLoading) return;

      if (!user) {
        openAuthPopup('onlyLogin');
        handleUpdateReturnUrl();
        return;
      }

      if (active) {
        toast.success('관심을 설정했습니다.');
        await apiService.addListingFavorite({ listing_id: id });
        mutate();
      } else {
        toast.success('관심을 해제했습니다.');
        await apiService.removeListingFavorite({ listing_id: id });
        mutate();
      }
    },
    [
      handleOpenAppInstallPopup,
      handleUpdateReturnUrl,
      inAppInfo.isInAppBrowser,
      isAuthLoading,
      mutate,
      openAuthPopup,
      user,
    ],
  );

  return (
    <MobileContainer>
      <MapListingList
        data={data}
        isLoading={isLoading}
        onClickListing={onClickListing}
        onToggleFavorite={onToggleFav}
        onClickBack={() => router.back()}
        onNext={increamentPageNumber}
      />
    </MobileContainer>
  );
});
