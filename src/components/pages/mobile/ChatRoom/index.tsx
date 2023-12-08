// /* eslint-disable react-hooks/exhaustive-deps */
// import { MobileContainer } from '@/components/atoms';
// import { ChatRoom } from '@/components/templates';
// import { memo, useEffect, useMemo, useState } from 'react';
// import { OverlayPresenter } from '@/components/molecules';
// import closeChatRoom from '@/apis/chat/closeChatRoom';
// import { mutate } from 'swr';
// import { useRouter } from 'next/router';
// import Routes from '@/router/routes';
// import { useChatButtonStore } from '@/states/mob/chatButtonStore';
// import { customAlphabet } from 'nanoid';
// import { toast } from 'react-toastify';

// import { ChatRoomPopup } from '@/components/organisms';
// import useChatRoom from './useChatRoom';

// export default memo(() => {
//   const router = useRouter();
//   const [closePopupStatus, setClosePopupStatus] = useState<number | undefined>(undefined);
//   const [chatRoomIsClosing, setChatRoomIsClosing] = useState(false);

//   const nanoID = customAlphabet('123456789');

//   const [photoSending, setPhotoSending] = useState(false);

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

//   const {
//     isShowMap,
//     naverMapURL,
//     naverMapAnother,
//     makeShowChat,
//     makeShowLatLng,
//     makeURL,
//     makeURLAnother,
//     makeAddressAPI,
//     makeBuildingName,
//     aName,
//     bName,
//   } = useChatButtonStore();

//   const handleClickReportButton = () => {
//     const chatRoomID = router.query.chatRoomID as string;

//     router.push(
//       { pathname: `/${Routes.EntryMobile}/${Routes.ChatRoomReport}`, query: { chatRoomID } },
//       `/${Routes.EntryMobile}/${Routes.ChatRoomReport}?chatRoomID=${chatRoomID}`,
//     );
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
//     router.replace(`/${Routes.EntryMobile}/${Routes.ChatRoomList}`);
//   };

//   const handleClickNavigateToListingDetail = (listingID?: number, biddingID?: Nullable<number>) => {
//     if (biddingID) {
//       router.push(
//         `/${Routes.EntryMobile}/${Routes.ListingDetailHistory}?listingID=${listingID}&biddingID=${biddingID}`,
//       );
//       return;
//     }

//     router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}`);
//   };

//   const handleClickNavigateToSuggestDetail = (suggestID?: number) => {
//     router.push(`/${Routes.EntryMobile}/${Routes.MySuggestDetail}?suggestID=${suggestID}`);
//   };

//   const handleClickNavigateToSuggestRecommended = (suggestRecommendID?: number) => {
//     router.push(
//       {
//         pathname: `/${Routes.EntryMobile}/${Routes.SuggestRecommendedList}`,
//         query: { suggestRecommendID: suggestRecommendID?.toString() },
//       },
//       `/${Routes.EntryMobile}/${Routes.SuggestRecommendedList}`,
//     );
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

//   useEffect(
//     () => () => {
//       makeShowChat();
//       makeURL('');
//       makeURLAnother('');
//       makeAddressAPI('');
//       makeBuildingName('');
//     },
//     [],
//   );

//   useEffect(() => {
//     if (!isShowMap && naverMapURL) {
//       const objectMessage = {
//         naverMapURL,
//         naverMapAnother,
//         aName,
//         bName,
//       };

//       const objectMessageToString = JSON.stringify(objectMessage);

//       handleSendMessage(`${objectMessageToString}`);

//       setTimeout(() => {
//         makeShowLatLng(undefined, undefined);
//         makeAddressAPI('');
//         makeBuildingName('');
//         makeURL('');
//         makeURLAnother('');
//       }, 200);
//     }
//   }, [isShowMap, naverMapURL]);

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
//     <MobileContainer>
//       {/* {isShowMap ? (
//         <MobChatMapTemplate />
//       ) : (
//        <ChatRoom>
//       )} */}

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
//         onClickReportButton={handleClickReportButton}
//         onClickLeaveButton={handleClickLeaveButton}
//         onClickNavigateToListingDetail={handleClickNavigateToListingDetail}
//         onClickNavigateToSuggestDetail={handleClickNavigateToSuggestDetail}
//         onClickNavigateToSuggestRecommended={handleClickNavigateToSuggestRecommended}
//         onClickBack={() => {
//           if (typeof window !== 'undefined') {
//             const canGoBack = window.history.length > 1;

//             if (canGoBack) {
//               router.back();
//             } else {
//               router.replace('/');
//             }
//           }
//         }}
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
//     </MobileContainer>
//   );
// });

export default function ChatRoom() {
  return null;
}
