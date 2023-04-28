import { Panel } from '@/components/atoms';
import { MapListingList } from '@/components/templates';
import { memo, useCallback } from 'react';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
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

  return (
    <Panel width={panelWidth}>
      <MapListingList data={data} isLoading={isLoading} onClickListing={onClickListing} />
    </Panel>
  );
});
