import assignAgent from '@/apis/listing/assignAgent';
import deleteMyListing from '@/apis/listing/deleteMyListing';
import useAPI_MyListingDetail from '@/apis/listing/getMyListingDetail';
import selectListingAddress from '@/apis/listing/selectListingAddress';
import sendOwnerVerification from '@/apis/listing/sendOwnerVerification';
import { MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { AgentCarouselItem } from '@/components/organisms/AgentCardCarousel';
import { AddressListItem } from '@/components/organisms/ListingCreateResultStatus/MultipleAddressesFound';
import { ListingCreateResult } from '@/components/templates';
import { ListingStatus } from '@/constants/enums';
import ErrorCodes from '@/constants/error_codes';
import usePolling from '@/hooks/utils/usePolling';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

export default memo(() => {
  const router = useRouter();
  const listingID = Number(router.query.listingID) ?? 0;

  const { data, mutate: mutateMyListingDetail, isLoading } = useAPI_MyListingDetail(listingID);

  usePolling(mutateMyListingDetail, 5000, 5);

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
        mutateMyListingDetail();
      }
    },
    [mutateMyListingDetail, listingID, data?.address_list],
  );

  const handleSelectAgent = useCallback(async () => {
    if (popupData.current) {
      setIsSelectingAgent(true);
      const res = await assignAgent({ listing_id: listingID, user_selected_agent_id: popupData.current?.id });
      mutateMyListingDetail();
      if (res?.error_code) {
        setPopup('agentSelectionFail');
      } else {
        setPopup('agentSelectionSuccess');
      }
      setIsSelectingAgent(false);
    }
  }, [listingID, mutateMyListingDetail]);

  const showAgentSelectionPopup = useCallback(
    async (index: number) => {
      const agent = data?.agent_list?.[index];
      if (agent) {
        setPopup('agentSelection');
        popupData.current = agent;
      }
    },
    [data?.agent_list],
  );

  const onClickRemoveFromListings = useCallback(async () => {
    deleteMyListing(listingID);
    // router.pop();
  }, [listingID]);

  const showSendSmsPopup = useCallback((name: string, phone: string) => {
    console.log(name, phone);
    popupData.current = { name, phone };
    setPopup('sendSms');
  }, []);

  const onClickSendOwnerVerification = useCallback(async () => {
    if (popupData.current?.name && popupData.current.phone) {
      setPopup('none');
      setIsSendingSms(true);
      const res = await sendOwnerVerification({
        listing_id: listingID,
        name: popupData.current.name,
        phone: popupData.current.phone,
      });

      if (res?.error_code === ErrorCodes.UNABLE_TO_VALIDATE_OWNER) {
        setPopup('unableToValidateTheOwner');
      } else if (res?.error_code === ErrorCodes.SMS_COUNT_REACHED_LIMIT) {
        setPopup('smsCountReachedLimit');
      } else if (!res?.error_code) {
        await mutateMyListingDetail();
      }

      setIsSendingSms(false);
    }
  }, [listingID, mutateMyListingDetail]);

  const handleNavigateToMyListings = useCallback(() => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.My}`,
    });
  }, [router]);

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleNavigateToChatRoom = useCallback(() => {
    if (data?.seller_agent_chat_room_id) {
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${data?.seller_agent_chat_room_id}`);
    } else {
      toast.error('채팅방을 찾을 수 없습니다.');
    }
  }, [router, data?.seller_agent_chat_room_id]);

  const showStartOverPopup = useCallback(() => {
    setPopup('startOver');
  }, []);

  const handleClickStartOver = useCallback(async () => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateAddress}`,
    });

    await deleteMyListing(listingID);
    mutate((key) => {
      if (typeof key === 'object' && key?.[0] === '/my/listings/registered') return true;
      return false;
    });
  }, [router, listingID]);

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
        address={data?.listing?.road_name_address ?? data?.listing?.jibun_address}
        addressDetail={data?.listing?.address_detail}
        onClickStartOver={showStartOverPopup}
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
        onSelectAgent={showAgentSelectionPopup}
        onClickRemoveFromListings={onClickRemoveFromListings}
        onClickSendOwnerVerification={showSendSmsPopup}
        onClickMyListings={handleNavigateToMyListings}
        onNavigateToChatRoom={data?.seller_agent_chat_room_id ? handleNavigateToChatRoom : undefined}
      />
      {popup === 'startOver' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>새로운 매물등록신청 시작</Popup.Title>
              <Popup.Body>
                기존 입력 내용은 삭제되며 복구되지 않습니다. 매물등록신청을 처음부터 다시 진행하시겠습니까?
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setPopup('none')}>돌아가기</Popup.CancelButton>
              <Popup.ActionButton isLoading={isSelectingAgent} onClick={handleClickStartOver}>
                매물등록신청 다시하기
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {popup === 'sendSms' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>소유자 정보 확인</Popup.Title>
              <Popup.Body>
                아래의 정보로 소유자 동의를 위한 문자가 전송됩니다.
                <br />
                <br />
                소유자 성명: {popupData.current?.name}
                <br />
                휴대폰 번호: {popupData.current?.phone}
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setPopup('none')}>수정하기</Popup.CancelButton>
              <Popup.ActionButton isLoading={isSelectingAgent} onClick={onClickSendOwnerVerification}>
                확인
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {popup === 'unableToValidateTheOwner' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-12">
              <Popup.Title>
                등기부상 소유자가 아닙니다.
                <br />
                소유자 성명을 다시 한번 확인해 주세요.
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setPopup('none')}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {popup === 'smsCountReachedLimit' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-12">
              <Popup.Title>
                하루 최대 발송 한도를 초과했습니다.
                <br />
                내일 다시 시도해 주세요.
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setPopup('none')}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
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
    </MobileContainer>
  );
});
