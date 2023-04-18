import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import { Panel } from '@/components/atoms';
import { ListingDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  listingID: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth, listingID }: Props) => {
  const router = useRouter(depth);

  const { data, isLoading } = useAPI_GetListingDetail(listingID);

  const handleNavigateToParticipateBidding = useCallback(() => {
    router.push(Routes.BiddingForm, {
      searchParams: {
        listingID: router.query.listingID as string,
      },
    });
  }, [router]);

  const handleNavigateToUpdateBidding = useCallback(() => {
    if (!data?.bidding_id) {
      toast.error('bidding_id not found');
    }

    router.push(Routes.UpdateBiddingForm, {
      searchParams: {
        listingID: router.query.listingID as string,
        biddingID: `${data?.bidding_id}`,
      },
    });
  }, [router, data?.bidding_id]);

  return (
    <Panel width={panelWidth}>
      <ListingDetail
        listing={data?.listing}
        visitUserType={data?.visit_user_type}
        isLoading={isLoading}
        onNavigateToParticipateBidding={handleNavigateToParticipateBidding}
        onNavigateToUpdateBidding={handleNavigateToUpdateBidding}
      />
    </Panel>
  );
});
