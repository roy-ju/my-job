import useAPI_GetListingDetail, { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import useAPI_GetListingStatus from '@/apis/listing/getListingStatus';
import { Loading, Panel } from '@/components/atoms';
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

  const { data: statusData, isLoading: isLoadingStatus } = useAPI_GetListingStatus(listingID);
  const { data, isLoading } = useAPI_GetListingDetail(statusData?.can_access ? listingID : 0);

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

  if (data?.error_code) {
    return <Panel width={panelWidth}>{data?.error_code}</Panel>;
  }

  if (isLoading || isLoadingStatus) {
    return (
      <Panel width={panelWidth}>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );
  }

  if (!statusData?.can_access) {
    return (
      <Panel width={panelWidth}>
        <div tw="py-20">CANNOT ACCESS</div>
      </Panel>
    );
  }

  return (
    <Panel width={panelWidth}>
      <ListingDetail
        listingDetail={data as GetListingDetailResponse}
        isLoading={isLoading || isLoadingStatus}
        onNavigateToParticipateBidding={handleNavigateToParticipateBidding}
        onNavigateToUpdateBidding={handleNavigateToUpdateBidding}
      />
    </Panel>
  );
});
