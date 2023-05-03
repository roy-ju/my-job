import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import reportListing from '@/apis/listing/reportListing';
import { MobileContainer } from '@/components/atoms';
import { ListingReport } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export default memo(() => {
  const router = useRouter();
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
