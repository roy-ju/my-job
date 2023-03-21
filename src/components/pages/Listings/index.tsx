import { Panel } from '@/components/atoms';
import { Listings } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const handleClickListingDetail = useCallback(
    (id: number) => {
      router.push('listingDetail', {
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
