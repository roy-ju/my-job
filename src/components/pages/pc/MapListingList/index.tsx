import { Panel } from '@/components/atoms';
import { MapListingList } from '@/components/templates';
import { memo, useCallback } from 'react';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { addFavorite } from '@/apis/listing/addListingFavroite';
import { toast } from 'react-toastify';
import { removeFavorite } from '@/apis/listing/removeListingFavorite';
import useAuth from '@/hooks/services/useAuth';
import useMapListingList from './useMapListingList';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const { data, isLoading, increamentPageNumber } = useMapListingList();

  const { user, isLoading: isAuthLoading } = useAuth();

  const onClickListing = useCallback(
    (id: number, buyOrRent: number) => {
      router.push(Routes.ListingDetail, {
        persistParams: true,
        searchParams: { listingID: `${id}` },
        state: {
          bor: `${buyOrRent}`,
        },
      });
    },
    [router],
  );

  const onToggleFav = useCallback(
    (id: number, active: boolean) => {
      if (isAuthLoading) return;

      if (!user) {
        router.replaceCurrent(Routes.Login, {
          persistParams: true,
          searchParams: { redirect: `${router.asPath}`, back: 'true' },
        });
        return;
      }

      if (!user.isVerified) {
        router.replaceCurrent(Routes.VerifyCi, {
          persistParams: true,
          searchParams: { redirect: `${router.asPath}`, back: 'true' },
        });
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
    [isAuthLoading, router, user],
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
