import { Panel } from '@/components/atoms';
import { DanjiDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const handleCLickListingDetail = useCallback(() => {
    router.push(Routes.ListingDetail, {
      searchParams: {
        listingID: `1`,
      },
    });
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <DanjiDetail onClickListingDetail={handleCLickListingDetail} />
    </Panel>
  );
});
