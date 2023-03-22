import { Panel } from '@/components/atoms';
import { Listings } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const handleClickListingDetail = useCallback(
    (id: number) => {
      router.push(Routes.ListingDetail, {
        searchParams: {
          listingID: id,
        },
      });
    },
    [router],
  );

  return (
    <Panel width={panelWidth}>
      <Listings onClickListingDetail={handleClickListingDetail} />
    </Panel>
  );
});
