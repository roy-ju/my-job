import { memo, useCallback, useState } from 'react';

import { toast } from 'react-toastify';

import { Panel } from '@/components/atoms';

import { ListingReport } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

import { apiService } from '@/services';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;
  const { data } = useFetchListingDetail(listingID);
  const [isReporting, setIsReporting] = useState(false);

  const handleReport = useCallback(
    async (value: string) => {
      setIsReporting(true);
      await apiService.listingReportCreate({
        listing_id: listingID,
        message: value,
      });
      setIsReporting(false);
      await router.pop();
      toast.success('신고되었습니다.');
    },
    [router, listingID],
  );

  return (
    <Panel width={panelWidth}>
      <ListingReport tradeID={data?.listing?.trade_id} isReporting={isReporting} onClickReport={handleReport} />
    </Panel>
  );
});
