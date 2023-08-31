/* eslint-disable react-hooks/exhaustive-deps */
import { MobileContainer } from '@/components/atoms';
import { ChatRoom } from '@/components/templates';
import { memo, useEffect, useMemo, useState } from 'react';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { ChatUserType } from '@/constants/enums';
import closeChatRoom from '@/apis/chat/closeChatRoom';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
import Routes from '@/router/routes';
import { useChatButtonStore } from '@/states/mob/chatButtonStore';
// import dynamic from 'next/dynamic';
import { customAlphabet } from 'nanoid';
import useChatRoom from './useChatRoom';

// const MobChatMapTemplate = dynamic(() => import('@/components/templates/MobChatMap'), {
//   ssr: false,
// });

export default memo(() => {
  const router = useRouter();

  const [popupOpen, setPopupOpen] = useState(false);

  const nanoID = customAlphabet('123456789');

  const [photoSending, setPhotoSending] = useState(false);

  const {
    listingTitle,
    agentName,
    chatMessages,
    agentProfileImagePath,
    isLoading,
    isTextFieldDisabled,
    photosUrls,
    handleChangePhotoUrls,
    handleSendMessage,
    chatUserType,
  } = useChatRoom(Number(router.query.chatRoomID));

  const {
    isShowMap,
    naverMapURL,
    naverMapAnother,
    makeShowChat,
    makeShowLatLng,
    makeURL,
    makeURLAnother,
    makeAddressAPI,
    makeBuildingName,
    aName,
    bName,
  } = useChatButtonStore();

  const handleClickReportButton = () => {
    const chatRoomID = router.query.chatRoomID as string;

    router.push(
      { pathname: `/${Routes.EntryMobile}/${Routes.ChatRoomReport}`, query: { chatRoomID } },
      `/${Routes.EntryMobile}/${Routes.ChatRoomReport}?chatRoomID=${chatRoomID}`,
    );
  };

  const handleClickLeaveButton = () => {
    setPopupOpen(true);
  };

  const handleCloseChatRoom = async () => {
    const chatRoomID = Number(router.query.chatRoomID);
    await closeChatRoom(chatRoomID);
    await mutate('/chat/room/list');
    router.replace(`/${Routes.EntryMobile}/${Routes.ChatRoomList}`);
  };

  const handleClickNavigateToListingDetail = (listingID: number) => () => {
    router.replace(
      { pathname: `/${Routes.EntryMobile}/${Routes.ListingDetail}`, query: { listingID: `${listingID}` } },
      `/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}`,
    );
  };

  const handleClickNavigateToListingDetailHistory = (listingID: number, biddingID: number) => () => {
    if (biddingID) {
      router.replace(
        { pathname: `/${Routes.EntryMobile}/${Routes.ListingDetailHistory}`, query: { listingID: `${listingID}` } },
        `/${Routes.EntryMobile}/${Routes.ListingDetailHistory}?listingID=${listingID}&biddingID=${biddingID}&tab=${4}`,
      );
    } else {
      router.replace(
        { pathname: `/${Routes.EntryMobile}/${Routes.ListingDetailPassed}`, query: { listingID: `${listingID}` } },
        `/${Routes.EntryMobile}/${Routes.ListingDetailPassed}?listingID=${listingID}&tab=${4}`,
      );
    }
  };

  const renderPopupBodyContents = () => {
    if (chatUserType === ChatUserType.Seller) {
      return '등록된 매물의 담당 중개사님과의 채팅종료는 매물등록 취소나 거래성사되어야만 가능합니다.';
    }

    return '채팅을 나가시면 이 중개사님과의 협의중인 모든 매물에 제안이 취소되며 협의 재개를 위해서는 다시 제안이 필요합니다. 채팅방을 나가시겠습니까?';
  };

  const renderPopupButton = () => {
    if (chatUserType === ChatUserType.Buyer) {
      return (
        <>
          <Popup.CancelButton>돌아가기</Popup.CancelButton>
          <Popup.ActionButton onClick={handleCloseChatRoom}>채팅방 나가기</Popup.ActionButton>
        </>
      );
    }
    return <Popup.ActionButton onClick={() => setPopupOpen(false)}>확인</Popup.ActionButton>;
  };

  const convertedChatMessages = useMemo(() => {
    if (photoSending && photosUrls.length > 0) {
      const list = photosUrls.map(() => ({
        id: Number(nanoID()),
        name: '',
        profileImagePath: '',
        message: '',
        chatUserType: 1,
        sentTime: '',
        agentReadTime: null,
        photoLoading: true,
      }));
      return chatMessages.concat([...list]);
    }

    return chatMessages;
  }, [photoSending, photosUrls, chatMessages, nanoID]);

  useEffect(
    () => () => {
      makeShowChat();
      makeURL('');
      makeURLAnother('');
      makeAddressAPI('');
      makeBuildingName('');
    },
    [],
  );

  useEffect(() => {
    if (!isShowMap && naverMapURL) {
      const objectMessage = {
        naverMapURL,
        naverMapAnother,
        aName,
        bName,
      };

      const objectMessageToString = JSON.stringify(objectMessage);

      handleSendMessage(`${objectMessageToString}`);

      setTimeout(() => {
        makeShowLatLng(undefined, undefined);
        makeAddressAPI('');
        makeBuildingName('');
        makeURL('');
        makeURLAnother('');
      }, 200);
    }
  }, [isShowMap, naverMapURL]);

  return (
    <MobileContainer>
      {/* {isShowMap ? (
        <MobChatMapTemplate />
      ) : (
       <ChatRoom>
      )} */}

      <ChatRoom
        title={listingTitle ?? ''}
        agentName={agentName ?? ''}
        agentProfileImagePath={agentProfileImagePath ?? ''}
        isLoading={isLoading}
        chatUserType={chatUserType ?? 0}
        chatMessages={convertedChatMessages}
        photosUrls={photosUrls}
        textFieldDisabled={isTextFieldDisabled}
        onSendMessage={handleSendMessage}
        onChangePhotosUrls={handleChangePhotoUrls}
        onClickReportButton={handleClickReportButton}
        onClickLeaveButton={handleClickLeaveButton}
        onClickNavigateToListingDetail={handleClickNavigateToListingDetail}
        onClickNavigateToListingDetailHistory={handleClickNavigateToListingDetailHistory}
        onClickBack={() => {
          if (typeof window !== 'undefined') {
            const canGoBack = window.history.length > 1;

            if (canGoBack) {
              router.back();
            } else {
              router.replace('/');
            }
          }
        }}
        setPhotoSending={setPhotoSending}
      />

      {popupOpen && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>채팅방 나가기</Popup.Title>
              <Popup.Body>{renderPopupBodyContents()}</Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>{renderPopupButton()}</Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});
