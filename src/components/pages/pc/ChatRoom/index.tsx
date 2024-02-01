// import { Panel } from '@/components/atoms';
// import { ChatRoom } from '@/components/templates';
// import { useRouter } from '@/hooks/utils';
// import { memo, useEffect, useMemo, useState } from 'react';
// import Routes from '@/router/routes';
// import { OverlayPresenter } from '@/components/molecules';
// import closeChatRoom from '@/apis/chat/closeChatRoom';
// import { mutate } from 'swr';
// import { customAlphabet } from 'nanoid';
// import { ChatRoomPopup } from '@/components/organisms';

// import { toast } from 'react-toastify';
// import { useRouter as useNextRouter } from 'next/router';
// import useChatRoom from './useChatRoom';

// interface Props {
//   depth: number;
//   panelWidth?: string;
// }

// export default memo(({ depth, panelWidth }: Props) => {
//   const router = useRouter(depth);
//   const nextRouter = useNextRouter();
//   const [closePopupStatus, setClosePopupStatus] = useState<number | undefined>(undefined);
//   const [chatRoomIsClosing, setChatRoomIsClosing] = useState(false);

//   const {
//     otherName,
//     deregistered,
//     chatMessages,
//     isLoading,
//     isTextFieldDisabled,
//     photosUrls,
//     handleSendMessage,
//     handleChangePhotoUrls,
//     chatUserType,
//     chatRoomType,
//     accordionDetails,
//     mutate: mutateChatRoomDetail,
//   } = useChatRoom(Number(router.query.chatRoomID));

//   const nanoID = customAlphabet('123456789');

//   const [photoSending, setPhotoSending] = useState(false);

//   const handleClickReportButton = () => {
//     const chatRoomID = router.query.chatRoomID as string;
//     router.replace(`${Routes.ChatRoomReport}`, {
//       persistParams: true,
//       searchParams: { chatRoomID },
//     });
//   };

//   const handleClickLeaveButton = async () => {
//     if (!router.query.chatRoomID) return;

//     setClosePopupStatus(1);
//   };

//   const handleCloseChatRoom = async () => {
//     const chatRoomID = Number(router.query.chatRoomID);
//     await closeChatRoom(chatRoomID);
//     setChatRoomIsClosing(true);
//     await mutate('/chat/room/list');
//     toast.success('채팅방 나가기가 완료되었습니다.');
//     router.pop();
//   };

//   const handleClickNavigateToListingDetail = (listingID?: number, biddingID?: Nullable<number>) => {
//     if (biddingID && listingID) {
//       router.replace(Routes.ListingDetailHistory, {
//         searchParams: { listingID: `${listingID}`, biddingID: `${biddingID}`, back: `${router.asPath}` },
//       });
//       return;
//     }

//     if (listingID) {
//       router.replace(Routes.ListingDetail, {
//         searchParams: { listingID: `${listingID}`, back: `${router.asPath}` },
//       });
//     }
//   };

//   const handleClickNavigateToLSuggestDetail = (suggestID?: number) => {
//     if (suggestID) {
//       router.replace(Routes.MySuggestDetail, {
//         searchParams: { suggestID: `${suggestID}`, back: `${router.asPath}` },
//       });
//     }
//   };

//   const handleClickNavigateToSuggestRecommended = (suggestRecommendID?: number) => {
//   };

//   const convertedChatMessages = useMemo(() => {
//     if (photoSending && photosUrls.length > 0) {
//       const list = photosUrls.map(() => ({
//         id: Number(nanoID()),
//         name: '',
//         profileImagePath: '',
//         message: '',
//         chatUserType: 1,
//         sentTime: '',
//         agentReadTime: null,
//         photoLoading: true,
//       }));
//       return chatMessages.concat([...list]);
//     }

//     return chatMessages;
//   }, [photoSending, photosUrls, chatMessages, nanoID]);

//   useEffect(() => {
//     if (typeof window !== 'undefined' && window?.Negocio.callbacks?.mutateChatRoomDetail) {
//       window.Negocio.callbacks.mutateChatRoomDetail = () => {
//         mutateChatRoomDetail();
//       };

//       return () => {
//         delete window.Negocio.callbacks.mutateChatRoomDetail;
//       };
//     }
//   }, [mutateChatRoomDetail]);

//   return (
//     <Panel width={panelWidth}>
//       <ChatRoom
//         deregistered={deregistered}
//         isLoading={isLoading}
//         chatUserType={chatUserType ?? 0}
//         chatRoomType={chatRoomType ?? 0}
//         accordionDetails={accordionDetails}
//         title={deregistered ? '탈퇴한 회원' : otherName}
//         chatMessages={convertedChatMessages}
//         photosUrls={photosUrls}
//         textFieldDisabled={isTextFieldDisabled}
//         onSendMessage={handleSendMessage}
//         onChangePhotosUrls={handleChangePhotoUrls}
//         onClickBack={router.query.back ? () => nextRouter.push(router.query.back as string) : undefined}
//         onClickReportButton={handleClickReportButton}
//         onClickLeaveButton={handleClickLeaveButton}
//         onClickNavigateToListingDetail={handleClickNavigateToListingDetail}
//         onClickNavigateToSuggestDetail={handleClickNavigateToLSuggestDetail}
//         onClickNavigateToSuggestRecommended={handleClickNavigateToSuggestRecommended}
//         setPhotoSending={setPhotoSending}
//       />

//       {closePopupStatus === 1 && (
//         <OverlayPresenter>
//           <ChatRoomPopup.CloseCase1
//             onLeaveChatRoom={handleCloseChatRoom}
//             onClickClose={() => setClosePopupStatus(undefined)}
//             isLoading={chatRoomIsClosing}
//           />
//         </OverlayPresenter>
//       )}
//     </Panel>
//   );
// });

export default function ChatRoom() {
  return null;
}
