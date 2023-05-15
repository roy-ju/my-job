import assignAgent from '@/apis/listing/assignAgent';
import deleteMyListing from '@/apis/listing/deleteMyListing';
import useAPI_MyListingDetail from '@/apis/listing/getMyListingDetail';
import selectListingAddress from '@/apis/listing/selectListingAddress';
import sendOwnerVerification from '@/apis/listing/sendOwnerVerification';
import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { AgentCarouselItem } from '@/components/organisms/AgentCardCarousel';
import { AddressListItem } from '@/components/organisms/ListingCreateResultStatus/MultipleAddressesFound';
import { ListingCreateResult } from '@/components/templates';
import { ListingStatus } from '@/constants/enums';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;

  const { data, mutate, isLoading } = useAPI_MyListingDetail(listingID);

  const [isSendingSms, setIsSendingSms] = useState(false);
  const [isSelectingAgent, setIsSelectingAgent] = useState(false);

  const [popup, setPopup] = useState('none');

  const popupData = useRef<any>();

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

  const showAgentSelectionPopup = useCallback(
    async (index: number) => {
      const agent = data?.agent_list?.[index];
      if (agent) {
        setPopup('agentSelection');
        popupData.current = agent;
      }
    },
    [data],
  );

  const handleSelectAgent = useCallback(async () => {
    if (popupData.current) {
      setIsSelectingAgent(true);
      const res = await assignAgent({ listing_id: listingID, user_selected_agent_id: popupData.current?.id });
      mutate();
      if (res?.error_code) {
        setPopup('agentSelectionFail');
      } else {
        setPopup('agentSelectionSuccess');
      }
      setIsSelectingAgent(false);
    }
  }, [listingID, mutate]);

  const onClickRemoveFromListings = useCallback(async () => {
    deleteMyListing(listingID);
    router.pop();
  }, [router, listingID]);

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
    router.replace(Routes.MyRegisteredListingList, { searchParams: { tab: '1' } });
  }, [router]);

  if ((data?.listing_status ?? 0) >= ListingStatus.Active) {
    router.pop();
    return null;
  }

  if (data?.error_code === 2002) {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="py-10">
            <Popup.Title>유효하지 않은 페이지입니다.</Popup.Title>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={() => router.pop({ persistParams: false })}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return (
    <Panel width={panelWidth}>
      <ListingCreateResult
        isLoading={isLoading}
        data={data}
        addressList={addressList}
        agents={agentList}
        isSendingSms={isSendingSms}
        ownerName={data?.listing?.owner_name}
        ownerPhone={data?.listing?.owner_phone}
        onClickStartOver={() => router.replace(Routes.ListingCreateAddress, { persistParams: true })}
        onClickUpdateAddress={() =>
          router.replace(Routes.ListingCreateUpdateAddress, { searchParams: { listingID: `${listingID}` } })
        }
        onSelectAddress={onSelectAddress}
        onSelectAgent={showAgentSelectionPopup}
        onClickRemoveFromListings={onClickRemoveFromListings}
        onClickSendOwnerVerification={onClickSendOwnerVerification}
        onClickMyListings={handleNavigateToMyListings}
      />
      {popup === 'agentSelection' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>선택한 중개사 확인</Popup.Title>
              <Popup.Body>{popupData.current?.name} 공인중개사님에게 매물등록을 신청하시겠습니까?</Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setPopup('none')}>다시 선택하기</Popup.CancelButton>
              <Popup.ActionButton isLoading={isSelectingAgent} onClick={handleSelectAgent}>
                선택확정
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {popup === 'agentSelectionSuccess' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>수고하셨습니다!</Popup.Title>
              <Popup.Body>중개사님과 채팅으로 매물등록 협의를 진행해 주세요.</Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setPopup('none')}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {popup === 'agentSelectionFail' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>중개사 선택 불가</Popup.Title>
              <Popup.Body>
                선택하신 중개사의 사정으로 해당 중개사를 선택할 수 없습니다. 다른 중개사를 선택하여 매물등록 신청을
                완료해 주세요.
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setPopup('none')}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
