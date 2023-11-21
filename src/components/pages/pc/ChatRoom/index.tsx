import { Panel } from '@/components/atoms';
import { ChatRoom } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useEffect, useMemo, useState } from 'react';
import Routes from '@/router/routes';
import { OverlayPresenter } from '@/components/molecules';
import { ChatRoomType } from '@/constants/enums';
import closeChatRoom from '@/apis/chat/closeChatRoom';
import { mutate } from 'swr';
import { customAlphabet } from 'nanoid';
import { ChatRoomPopup } from '@/components/organisms';
import { completeRecommend } from '@/apis/suggest/completeRecommend';
import checkChatRoom from '@/apis/chat/checkChatRoom';
import { toast } from 'react-toastify';
import { useRouter as useNextRouter } from 'next/router';
import useChatRoom from './useChatRoom';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();
  const [closePopupStatus, setClosePopupStatus] = useState<number | undefined>(undefined);
  const [chatRoomIsClosing, setChatRoomIsClosing] = useState(false);
  const [showContractCtaPopup, setShowContractCtaPopup] = useState(false);

  const {
    title,
    otherName,
    chatMessages,
    isLoading,
    isTextFieldDisabled,
    photosUrls,
    handleSendMessage,
    handleChangePhotoUrls,
    chatUserType,
    chatRoomType,
    listingItem,
    biddingItem,
    suggestItem,
    suggestRecommendItem,
    mutate: mutateChatRoomDetail,
  } = useChatRoom(Number(router.query.chatRoomID));

  const nanoID = customAlphabet('123456789');

  const [photoSending, setPhotoSending] = useState(false);

  const handleClickReportButton = () => {
    const chatRoomID = router.query.chatRoomID as string;
    router.replace(`${Routes.ChatRoomReport}`, {
      persistParams: true,
      searchParams: { chatRoomID },
    });
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
    router.pop();
  };

  const handleClickNavigateToListingDetail = (listingID: number) => () => {
    router.replace(Routes.ListingDetail, {
      searchParams: { listingID: `${listingID}`, back: `${router.asPath}` },
    });
  };

  const handleClickNavigateToListingCreateResult = (listingID: number) => () => {
    router.replace(Routes.ListingCreateResult, {
      searchParams: { listingID: `${listingID}`, back: `${router.asPath}` },
    });
  };

  const handleClickNavigateToListingDetailHistory = (listingID: number, biddingID: number) => () => {
    if (biddingID && listingID) {
      router.replace(Routes.ListingDetailHistory, {
        searchParams: { listingID: `${listingID}`, biddingID: `${biddingID}`, back: `${router.asPath}` },
      });
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

  useEffect(() => {
    if (typeof window !== 'undefined' && window?.Negocio.callbacks?.mutateChatRoomDetail) {
      window.Negocio.callbacks.mutateChatRoomDetail = () => {
        mutateChatRoomDetail();
      };

      return () => {
        delete window.Negocio.callbacks.mutateChatRoomDetail;
      };
    }
  }, [mutateChatRoomDetail]);

  return (
    <Panel width={panelWidth}>
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
        onClickBack={router.query.back ? () => nextRouter.push(router.query.back as string) : undefined}
        onClickReportButton={handleClickReportButton}
        onClickLeaveButton={handleClickLeaveButton}
        onClickContractCtaButton={handleClickContractCtaButton}
        onClickNavigateToListingDetail={handleClickNavigateToListingDetail}
        onClickNavigateToListingCreateResult={handleClickNavigateToListingCreateResult}
        onClickNavigateToListingDetailHistory={handleClickNavigateToListingDetailHistory}
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
    </Panel>
  );
});
