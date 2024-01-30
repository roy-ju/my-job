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

import { addFavorite } from '@/apis/listing/addListingFavroite';

import { removeFavorite } from '@/apis/listing/removeListingFavorite';

import replaceFirstOccurrence from '@/utils/replaceFirstOccurrence';
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
    (id: number, active: boolean) => {
      if (isAuthLoading) return;

      if (!user) {
        openAuthPopup('needVerify');
        handleUpdateReturnUrl();
        return;
      }

      if (!user.isVerified) {
        const path = replaceFirstOccurrence(router.asPath, Routes.MapListingList, Routes.VerifyCi);
        router.push(path);

        handleUpdateReturnUrl();
        return;
      }

      if (active) {
        addFavorite(id);
        toast.success('관심을 설정했습니다.');
      } else {
        removeFavorite(id);
        toast.success('관심을 해제했습니다.');
      }
    },
    [isAuthLoading, user, openAuthPopup, handleUpdateReturnUrl, router],
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
