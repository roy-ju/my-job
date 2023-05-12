import assignAgent from '@/apis/listing/assignAgent';
import deleteMyListing from '@/apis/listing/deleteMyListing';
import useAPI_MyListingDetail from '@/apis/listing/getMyListingDetail';
import selectListingAddress from '@/apis/listing/selectListingAddress';
import sendOwnerVerification from '@/apis/listing/sendOwnerVerification';
import { MobileContainer } from '@/components/atoms';
import { AgentCarouselItem } from '@/components/organisms/AgentCardCarousel';
import { AddressListItem } from '@/components/organisms/ListingCreateResultStatus/MultipleAddressesFound';
import { ListingCreateResult } from '@/components/templates';
import { ListingStatus } from '@/constants/enums';
import usePolling from '@/hooks/utils/usePolling';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

export default memo(() => {
  const router = useRouter();
  const listingID = Number(router.query.listingID) ?? 0;

  const { data, mutate, isLoading } = useAPI_MyListingDetail(listingID);

  usePolling(mutate, 5000, 5);

  const [isSendingSms, setIsSendingSms] = useState(false);

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
        officePhone: item.office_phone,
        fullJibunAddress: item.full_jibun_address,
        registrationNumber: item.registration_number,
        description: item.description,
      })) ?? [],
    [data?.agent_list],
  );

  useEffect(() => {
    // if (!listingID) {
    //   router.pop();
    // }
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
    // router.pop();
  }, [listingID]);

  const onClickSendOwnerVerification = useCallback(
    async (name: string, phone: string) => {
      setIsSendingSms(true);
      await sendOwnerVerification({
        listing_id: listingID,
        name,
        phone,
      });
      await mutate();

      setIsSendingSms(false);
    },
    [listingID, mutate],
  );

  const handleNavigateToMyListings = useCallback(() => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.My}`,
    });
  }, [router]);

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  if ((data?.listing_status ?? 0) >= ListingStatus.Active) {
    return null;
  }

  return (
    <MobileContainer>
      <ListingCreateResult
        onClickBack={handleClickBack}
        isLoading={isLoading}
        data={data}
        addressList={addressList}
        agents={agentList}
        isSendingSms={isSendingSms}
        ownerName={data?.listing?.owner_name}
        ownerPhone={data?.listing?.owner_phone}
        onClickStartOver={() =>
          router.replace({
            pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateAddress}`,
          })
        }
        onClickUpdateAddress={() =>
          router.replace(
            {
              pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateUpdateAddress}`,
              query: {
                listingID: `${listingID}`,
              },
            },
            `/${Routes.EntryMobile}/${Routes.ListingCreateUpdateAddress}?listingID=${listingID}`,
          )
        }
        onSelectAddress={onSelectAddress}
        onSelectAgent={onSelectAgent}
        onClickRemoveFromListings={onClickRemoveFromListings}
        onClickSendOwnerVerification={onClickSendOwnerVerification}
        onClickMyListings={handleNavigateToMyListings}
      />
    </MobileContainer>
  );
});
