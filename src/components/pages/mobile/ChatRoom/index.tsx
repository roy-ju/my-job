/* eslint-disable react-hooks/exhaustive-deps */
import { MobileContainer } from '@/components/atoms';
import { ChatRoom } from '@/components/templates';
import { memo, useEffect, useMemo, useState } from 'react';
import { OverlayPresenter } from '@/components/molecules';
import { ChatRoomPopup } from '@/components/organisms';
import { ChatRoomType } from '@/constants/enums';
import closeChatRoom from '@/apis/chat/closeChatRoom';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
import Routes from '@/router/routes';
import { useChatButtonStore } from '@/states/mob/chatButtonStore';
import { customAlphabet } from 'nanoid';
import { completeRecommend } from '@/apis/suggest/completeRecommend';
import { toast } from 'react-toastify';
import checkChatRoom from '@/apis/chat/checkChatRoom';
import useChatRoom from './useChatRoom';

export default memo(() => {
  const router = useRouter();
  const [closePopupStatus, setClosePopupStatus] = useState<number | undefined>(undefined);
  const [chatRoomIsClosing, setChatRoomIsClosing] = useState(false);
  const [showContractCtaPopup, setShowContractCtaPopup] = useState(false);

  const nanoID = customAlphabet('123456789');

  const [photoSending, setPhotoSending] = useState(false);

  const {
    title,
    otherName,
    chatMessages,
    isLoading,
    isTextFieldDisabled,
    photosUrls,
    handleChangePhotoUrls,
    handleSendMessage,
    chatUserType,
    chatRoomType,
    listingItem,
    biddingItem,
    suggestItem,
    suggestRecommendItem,

    mutate: mutateChatRoomDetail,
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

  const handleClickLeaveButton = async () => {
    if (!router.query.chatRoomID) return;
    const { case: closeCase, error_code } = await checkChatRoom(Number(router.query.chatRoomID as string));
    if (error_code === 2027) {
      toast.error('채팅방을 나갈 수 없습니다.');
    }

    setClosePopupStatus(closeCase);
  };

  const handleClickContractCtaButton = () => {
    setShowContractCtaPopup(true);
  };

  const handleCloseChatRoom = async () => {
    const chatRoomID = Number(router.query.chatRoomID);
    await closeChatRoom(chatRoomID);
    setChatRoomIsClosing(true);
    await mutate('/chat/room/list');
    router.replace(`/${Routes.EntryMobile}/${Routes.ChatRoomList}`);
  };

  const handleClickNavigateToListingDetail = (listingID: number) => () => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}`);
  };

  const handleClickNavigateToListingCreateResult = (listingID: number) => () => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingCreateResult}?listingID=${listingID}`);
  };

  const handleClickNavigateToListingDetailHistory = (listingID: number, biddingID: number) => () => {
    if (biddingID && listingID) {
      router.push(
        `/${Routes.EntryMobile}/${Routes.ListingDetailHistory}?listingID=${listingID}&biddingID=${biddingID}`,
      );
    }
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

  useEffect(() => {
    window.Negocio.callbacks.mutateChatRoomDetail = () => {
      mutateChatRoomDetail();
    };

    return () => {
      delete window.Negocio.callbacks.mutateChatRoomDetail;
    };
  }, [mutateChatRoomDetail]);

  return (
    <MobileContainer>
      {/* {isShowMap ? (
        <MobChatMapTemplate />
      ) : (
       <ChatRoom>
      )} */}

      <ChatRoom
        title={title ?? ''}
        isLoading={isLoading}
        chatUserType={chatUserType ?? 0}
        chatRoomType={chatRoomType ?? 0}
        listingItem={listingItem}
        biddingItem={biddingItem}
        suggestItem={suggestItem}
        suggestRecommendItem={suggestRecommendItem}
        chatMessages={convertedChatMessages}
        photosUrls={photosUrls}
        textFieldDisabled={isTextFieldDisabled}
        onSendMessage={handleSendMessage}
        onChangePhotosUrls={handleChangePhotoUrls}
        onClickReportButton={handleClickReportButton}
        onClickLeaveButton={handleClickLeaveButton}
        onClickContractCtaButton={handleClickContractCtaButton}
        onClickNavigateToListingDetail={handleClickNavigateToListingDetail}
        onClickNavigateToListingCreateResult={handleClickNavigateToListingCreateResult}
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

      {showContractCtaPopup && (
        <OverlayPresenter>
          <ChatRoomPopup.ContractComplete
            name={chatRoomType === ChatRoomType.BuyerAgentSuggestRecommendation ? `${otherName} 중개사` : otherName}
            onClickClose={() => {
              setShowContractCtaPopup(false);
            }}
            onClickContractComplete={async () => {
              if (!suggestRecommendItem?.suggest_recommend_id) return;
              await completeRecommend(suggestRecommendItem?.suggest_recommend_id ?? 0);
              await mutateChatRoomDetail();
              setShowContractCtaPopup(false);
            }}
          />
        </OverlayPresenter>
      )}
      {closePopupStatus === 1 && (
        <OverlayPresenter>
          <ChatRoomPopup.CloseCase1 onClickClose={() => setClosePopupStatus(undefined)} />
        </OverlayPresenter>
      )}
      {closePopupStatus === 2 && (
        <OverlayPresenter>
          <ChatRoomPopup.CloseCase2
            onLeaveChatRoom={handleCloseChatRoom}
            onClickClose={() => setClosePopupStatus(undefined)}
            isLoading={chatRoomIsClosing}
          />
        </OverlayPresenter>
      )}
      {closePopupStatus === 3 && (
        <OverlayPresenter>
          <ChatRoomPopup.CloseCase3
            onLeaveChatRoom={handleCloseChatRoom}
            onClickClose={() => setClosePopupStatus(undefined)}
            isLoading={chatRoomIsClosing}
          />
        </OverlayPresenter>
      )}
      {closePopupStatus === 4 && (
        <OverlayPresenter>
          <ChatRoomPopup.CloseCase4 onClickClose={() => setClosePopupStatus(undefined)} />
        </OverlayPresenter>
      )}
      {closePopupStatus === 5 && (
        <OverlayPresenter>
          <ChatRoomPopup.CloseCase5
            onLeaveChatRoom={handleCloseChatRoom}
            onClickClose={() => setClosePopupStatus(undefined)}
            isLoading={chatRoomIsClosing}
          />
        </OverlayPresenter>
      )}
      {closePopupStatus === 6 && (
        <OverlayPresenter>
          <ChatRoomPopup.CloseCase6
            onLeaveChatRoom={handleCloseChatRoom}
            onClickClose={() => setClosePopupStatus(undefined)}
            isLoading={chatRoomIsClosing}
          />
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});
