import useAPI_MyListingDetail from '@/apis/listing/getMyListingDetail';
import { Panel } from '@/components/atoms';
import { ListingCreateResult } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useEffect } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;

  const { data, isLoading } = useAPI_MyListingDetail(listingID);

  useEffect(() => {
    if (!listingID) {
      router.pop();
    }
  }, [router, listingID]);

  return (
    <Panel width={panelWidth}>
      <ListingCreateResult
        isLoading={isLoading}
        agentOfficeName={data?.agent_summary?.office_name}
        agentName={data?.agent_summary?.name}
        agentCellPhone={data?.agent_summary?.cell_phone}
        agentJibunAddress={data?.agent_summary?.address}
        agentRegistrationNumber={data?.agent_summary?.registration_number}
        agentProfileImageFullPath={data?.agent_summary?.profile_image_full_path}
        listingStatus={data?.listing_status}
        buyOrRent={data?.listing.buy_or_rent}
        rentArea={data?.listing.rent_area}
        addressLine1={data?.listing.road_name_address ?? data?.listing.jibun_address}
        addressLine2={data?.full_road_name_address?.replace(data?.listing.road_name_address ?? '', '')}
        onClickStartOver={() => router.replace(Routes.ListingCreateAddress)}
        onClickUpdateAddress={() =>
          router.replace(Routes.ListingCreateUpdateAddress, { searchParams: { listingID: `${listingID}` } })
        }
      />
    </Panel>
  );
});
