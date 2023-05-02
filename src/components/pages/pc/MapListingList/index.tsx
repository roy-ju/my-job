import { Panel } from '@/components/atoms';
import { MapListingList } from '@/components/templates';
import { memo, useCallback } from 'react';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { addFavorite } from '@/apis/listing/addListingFavroite';
import { toast } from 'react-toastify';
import { removeFavorite } from '@/apis/listing/removeListingFavorite';
import useMapListingList from './useMapListingList';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const { data, isLoading } = useMapListingList();

  const onClickListing = useCallback(
    (id: number) => {
      router.push(Routes.ListingDetail, { searchParams: { listingID: `${id}` } });
    },
    [router],
  );

  const onToggleFav = useCallback((id: number, active: boolean) => {
    if (active) {
      addFavorite(id);
      toast.success('관심을 설정했습니다.');
    } else {
      removeFavorite(id);
      toast.success('관심을 해제했습니다.');
    }
  }, []);

  return (
    <Panel width={panelWidth}>
      <MapListingList
        data={data}
        isLoading={isLoading}
        onClickListing={onClickListing}
        onToggleFavorite={onToggleFav}
      />
    </Panel>
  );
});
