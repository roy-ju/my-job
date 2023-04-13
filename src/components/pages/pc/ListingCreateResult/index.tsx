import assignAgent from '@/apis/listing/assignAgent';
import deleteMyListing from '@/apis/listing/deleteMyListing';
import useAPI_MyListingDetail from '@/apis/listing/getMyListingDetail';
import selectListingAddress from '@/apis/listing/selectListingAddress';
import { Panel } from '@/components/atoms';
import { AgentCarouselItem } from '@/components/organisms/AgentCardCarousel';
import { AddressListItem } from '@/components/organisms/ListingCreateResultStatus/MultipleAddressesFound';
import { ListingCreateResult } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useEffect, useMemo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;

  const { data, mutate, isLoading } = useAPI_MyListingDetail(listingID);

  const addressList = useMemo<AddressListItem[]>(
    () =>
      data?.address_list?.map((item) => ({
        addressDetail: item.address_detail,
        realestateUniqueNumber: item.realestate_unique_number,
        fullRoadNameAddress: item.full_road_name_address,
      })) ?? [],
    [data?.address_list],
  );

  const agentList = useMemo<AgentCarouselItem[]>(
    () =>
      data?.agent_list?.map((item) => ({
        id: item.id,
        officeName: item.office_name,
        profileImageFullPath: item.profile_image_full_path,
        name: item.name,
        cellPhone: item.cell_phone,
        fullJibunAddress: item.full_jibun_address,
        registrationNumber: item.registration_number,
        description: item.description,
      })) ?? [],
    [data?.agent_list],
  );

  useEffect(() => {
    if (!listingID) {
      router.pop();
    }
  }, [router, listingID]);

  const onSelectAddress = useCallback(
    async (realestateUniqueNumber: string) => {
      const address = data?.address_list?.find((item) => item.realestate_unique_number === realestateUniqueNumber);
      if (address) {
        await selectListingAddress({
          listing_id: listingID,
          realestate_unique_number: realestateUniqueNumber,
          address: address.full_road_name_address,
        });
        mutate();
      }
    },
    [mutate, listingID, data?.address_list],
  );

  const onSelectAgent = useCallback(
    async (index: number) => {
      const agent = data?.agent_list?.[index];
      if (agent) {
        await assignAgent({ listing_id: listingID, user_selected_agent_id: agent.id });
        mutate();
      }
    },
    [data?.agent_list, listingID, mutate],
  );

  const onClickRemoveFromListings = useCallback(async () => {
    deleteMyListing(listingID);
    router.pop();
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
        addressList={addressList}
        agents={agentList}
        onClickStartOver={() => router.replace(Routes.ListingCreateAddress)}
        onClickUpdateAddress={() =>
          router.replace(Routes.ListingCreateUpdateAddress, { searchParams: { listingID: `${listingID}` } })
        }
        onSelectAddress={onSelectAddress}
        onSelectAgent={onSelectAgent}
        onClickRemoveFromListings={onClickRemoveFromListings}
      />
    </Panel>
  );
});
