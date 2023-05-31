import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import reportListing from '@/apis/listing/reportListing';
import { Panel } from '@/components/atoms';
import { ListingReport } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;
  const { data } = useAPI_GetListingDetail(listingID);
  const [isReporting, setIsReporting] = useState(false);

  const handleReport = useCallback(
    async (value: string) => {
      setIsReporting(true);
      await reportListing({
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
