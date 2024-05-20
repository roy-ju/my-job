import { memo, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { MobileContainer } from '@/components/atoms';

import { ListingReport } from '@/components/templates';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';
import { apiService } from '@/services';

export default memo(() => {
  const router = useRouter();
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
      await router.back();
      toast.success('신고되었습니다.');
    },
    [router, listingID],
  );

  return (
    <MobileContainer>
      <ListingReport
        tradeID={data?.listing?.trade_id}
        isReporting={isReporting}
        onClickReport={handleReport}
        onClickBack={() => router.back()}
      />
    </MobileContainer>
  );
});
