import { memo, useCallback } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { Panel } from '@/components/atoms';

import { MapListingList } from '@/components/templates';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import useAuth from '@/hooks/services/useAuth';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import useMapListingList from './useMapListingList';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const customRouter = useCustomRouter(depth);

  const router = useRouter();

  const { data, isLoading, increamentPageNumber } = useMapListingList();

  const { user, isLoading: isAuthLoading } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const onClickListing = useCallback(
    (id: number, buyOrRent: number) => {
      customRouter.push(Routes.ListingDetail, {
        persistParams: true,
        searchParams: { listingID: `${id}` },
        state: {
          bor: `${buyOrRent}`,
        },
      });
    },
    [customRouter],
  );

  const onToggleFav = useCallback(
    async (id: number, active: boolean) => {
      if (isAuthLoading) return;

      if (!user) {
        openAuthPopup('onlyLogin');
        handleUpdateReturnUrl();
        return;
      }

      if (active) {
        await apiService.addListingFavorite({ listing_id: id });
        toast.success('관심을 설정했습니다.');
      } else {
        await apiService.removeListingFavorite({ listing_id: id });
        toast.success('관심을 해제했습니다.');
      }
    },
    [isAuthLoading, user, openAuthPopup, handleUpdateReturnUrl],
  );

  const handleNextPage = useCallback(() => {
    increamentPageNumber();
  }, [increamentPageNumber]);

  return (
    <Panel width={panelWidth}>
      <MapListingList
        key={(router.query.listingIDs as string) ?? 'mapListingList'}
        data={data}
        isLoading={isLoading}
        onClickListing={onClickListing}
        onToggleFavorite={onToggleFav}
        onNext={handleNextPage}
      />
    </Panel>
  );
});
