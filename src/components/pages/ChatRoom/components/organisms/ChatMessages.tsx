/* eslint-disable @next/next/no-img-element */

import { memo, useEffect, useMemo, useRef, useState } from 'react';

import tw from 'twin.macro';

import { Button, Loading, Moment } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import useOutsideClick from '@/hooks/useOutsideClick';

import { useIsomorphicLayoutEffect } from '@/hooks/utils';

import { ChatUserType } from '@/constants/enums';

import { checkPlatform } from '@/utils/checkPlatform';

import { compareMessageTime } from '@/utils/formatsTime';

import { ChatMessage } from '@/components/organisms';

import { ChatMessage as ChatMessgaeType } from '../../types';

export default memo(
  ({
    chat,
    prevChat,
    nextChat,
    chatRoomUserType,
  }: {
    chat: ChatMessgaeType;
    prevChat?: ChatMessgaeType;
    nextChat?: ChatMessgaeType;
    chatRoomUserType: ChatUserType;
  }) => {
    const photoWrraperRef = useRef<HTMLDivElement | null>(null);
    const outsideRef = useRef<HTMLDivElement | null>(null);

    const variant = useMemo(() => {
      if (chat.chatUserType === chatRoomUserType) return 'nego';
      if (chat.chatUserType !== ChatUserType.System) return 'gray';
      return 'system';
    }, [chat.chatUserType, chatRoomUserType]);

    const [imgUrl, setImgUrl] = useState('');

    const [imgError, setImgError] = useState(false);

    const [openPopupFullImage, setOpenPopupFullImage] = useState(false);

    const [platform, setCheckPlatform] = useState('');

    const shouldRenderAvatar = useMemo(() => {
      if (chat.chatUserType !== chatRoomUserType && chat.chatUserType !== ChatUserType.System) {
        if (!prevChat) return true;
        if (prevChat.chatUserType !== chat.chatUserType) return true;
      }
      return false;
    }, [chat, prevChat, chatRoomUserType]);

    const shouldRenderSentTime = useMemo(() => {
      if (!nextChat) return true;
      if (nextChat.chatUserType !== chat.chatUserType) return true;
      if (compareMessageTime(nextChat.sentTime) !== compareMessageTime(chat.sentTime)) return true;

      return false;
    }, [nextChat, chat]);

    const shouldRenderDate = useMemo(() => {
      if (!prevChat) return true;

      const prevSentTime = new Date(prevChat.sentTime);
      const sentTime = new Date(chat.sentTime);

      return prevSentTime.getDate() !== sentTime.getDate();
    }, [prevChat, chat]);

    const extraPaddingBottom = useMemo(() => {
      if (nextChat && nextChat.chatUserType !== chat.chatUserType) {
        return '24px';
      }
      return '8px';
    }, [nextChat, chat]);

    const isChatMessage = useMemo(() => {
      if (chat?.message?.includes(process.env.NEXT_PUBLIC_NEGOCIO_CHAT_PHOTO)) {
        return false;
      }
      return true;
    }, [chat?.message]);

    const isChatRelatedMap = useMemo(() => {
      if (chat?.message?.includes(process.env.NEXT_PUBLIC_NAVER_MAP_URL)) {
        return true;
      }
      return false;
    }, [chat?.message]);

    const isChatPhotoLoading = useMemo(() => {
      if (chat?.photoLoading) {
        return true;
      }
      return false;
    }, [chat?.photoLoading]);

    const extractLatitudeLongitudeFromURL = (url: string) => {
      const pattern = /\/(\d+\.\d+),(\d+\.\d+),/;
      const match = url.match(pattern);

      if (match) {
        const latitude = parseFloat(match[1]);
        const longitude = parseFloat(match[2]);
        return { latitude, longitude };
      }
      return null;
    };

    const imgSrcUrl = useMemo(() => {
      if (chat?.message) {
        const result = extractLatitudeLongitudeFromURL(chat?.message);

        if (result) {
          const { latitude, longitude } = result;

          return `https://simg.pstatic.net/static.map/v2/map/staticmap.bin?caller=og_map&scale=1&w=256&h=256&crs=EPSG:4326&center=${latitude},${longitude}&level=15&format=jpg&markers=type:d%7Csize:mid%7Cpos:${latitude}%20${longitude}`;
        }
      }
    }, [chat?.message]);

    const addressName = useMemo(() => {
      if (chat?.message && isChatRelatedMap && chat.message.includes('aName')) {
        const obj = JSON.parse(chat.message);
        return obj?.aName || '';
      }
    }, [chat?.message, isChatRelatedMap]);

    const buildingName = useMemo(() => {
      if (chat?.message && isChatRelatedMap && chat.message.includes('bName')) {
        const obj = JSON.parse(chat.message);
        return obj?.bName || '';
      }
    }, [chat?.message, isChatRelatedMap]);

    const directNaverMapURL = useMemo(() => {
      if (chat?.message && isChatRelatedMap) {
        if (chat.message[0] === '{' && chat.message[chat.message.length - 1] === '}') {
          const obj = JSON?.parse(chat.message);
          return obj.naverMapURL;
        }

        return chat?.message || '';
      }
    }, [chat?.message, isChatRelatedMap]);

    const directNaverMapURLAnother = useMemo(() => {
      if (chat?.message && isChatRelatedMap) {
        if (chat.message[0] === '{' && chat.message[chat.message.length - 1] === '}') {
          const obj = JSON?.parse(chat.message);
          return obj.naverMapAnother;
        }

        return chat?.message || '';
      }
    }, [chat?.message, isChatRelatedMap]);

    useOutsideClick({
      ref: outsideRef,
      enabled: openPopupFullImage,
      handler: () => {
        setOpenPopupFullImage(false);
      },
    });

    useIsomorphicLayoutEffect(() => {
      setCheckPlatform(checkPlatform());
    }, []);

    useEffect(() => {
      const handleImgError = () => {
        setImgError(true);
      };

      const handleOpenPopup = () => {
        setOpenPopupFullImage(true);
      };

      if (photoWrraperRef?.current) {
        const imgTag = photoWrraperRef.current.querySelectorAll('img');

        if (imgTag?.length > 0) {
          imgTag.forEach((ele) => ele.addEventListener('error', handleImgError));
        }

        if (imgTag?.length > 0) {
          imgTag.forEach((ele) => {
            setImgUrl(ele.src as string);
            ele.style.cursor = 'pointer';
            ele.addEventListener('click', handleOpenPopup);
          });
        }
      }

      // clean-up 함수 정의
      return () => {
        if (photoWrraperRef?.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          const imgTag = photoWrraperRef.current.querySelectorAll('img');

          if (imgTag?.length > 0) {
            imgTag.forEach((ele) => ele.removeEventListener('error', handleImgError));
          }

          if (imgTag?.length > 0) {
            imgTag.forEach((ele) => ele.removeEventListener('click', handleOpenPopup));
            setImgUrl('');
          }
        }
      };
    }, [photoWrraperRef]);

    return (
      <>
        <div tw="px-5" style={{ paddingBottom: extraPaddingBottom }}>
          {shouldRenderDate && !isChatPhotoLoading && (
            <div tw="py-6 text-center text-body_01">
              <Moment format="yyyy년 MM월 DD일">{chat.sentTime}</Moment>
            </div>
          )}

          <ChatMessage variant={variant}>
            {shouldRenderAvatar && !isChatPhotoLoading && <ChatMessage.Avatar src={chat.profileImagePath} />}

            {shouldRenderAvatar && !isChatPhotoLoading && <ChatMessage.SenderName>{chat.name}</ChatMessage.SenderName>}

            {isChatMessage && isChatPhotoLoading && (
              <ChatMessage.LoadingPhoto>
                <div tw="flex items-center justify-center [height: fit-content]">
                  <div tw="px-4 py-2 bg-gray-100 rounded-lg">
                    <Loading size="small" />
                  </div>
                </div>
              </ChatMessage.LoadingPhoto>
            )}

            {!isChatMessage &&
              !isChatPhotoLoading &&
              (imgError ? (
                <ChatMessage.Photo>
                  <div tw="[width: 112px] [height: 134.4px] bg-gray-800 [border-radius: 8px] flex items-center justify-center px-2">
                    <p tw="text-white font-bold text-justify">
                      삭제되었거나
                      <br />
                      존재하지 않는
                      <br />
                      이미지 입니다.
                    </p>
                  </div>
                </ChatMessage.Photo>
              ) : (
                <ChatMessage.Photo>
                  <div
                    className="negocioChatWrraper"
                    dangerouslySetInnerHTML={{ __html: chat.message }}
                    ref={photoWrraperRef}
                  />
                </ChatMessage.Photo>
              ))}

            {isChatMessage && !isChatRelatedMap && !isChatPhotoLoading && (
              <ChatMessage.Bubble>{chat.message}</ChatMessage.Bubble>
            )}

            {isChatMessage && isChatRelatedMap && !isChatPhotoLoading && (
              <ChatMessage.LinkTag>
                {imgSrcUrl && (
                  <img
                    alt=""
                    src={imgSrcUrl}
                    style={{ width: '200px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                  />
                )}

                {(buildingName || addressName) && (
                  <div tw="bg-white px-2 pt-2 [max-width: 200px]">
                    {buildingName && <p tw="text-body_01 text-gray-1000">{buildingName}</p>}
                    {addressName && <p tw="text-body_01 text-gray-700">{addressName}</p>}
                  </div>
                )}

                <div tw="flex items-center gap-2 [max-width: 200px] px-2 pb-2 bg-white [border-bottom-left-radius: 8px] [border-bottom-right-radius: 8px]">
                  <Button size="small" tw="w-full mt-2 rounded flex-1 px-1.5" variant="gray">
                    <a
                      type="button"
                      href={directNaverMapURL}
                      target="_blank"
                      rel="noreferrer"
                      tw="w-full text-center rounded-lg px-1.5"
                    >
                      장소 바로가기
                    </a>
                  </Button>
                  <Button size="small" tw="w-full mt-2 rounded flex-1 px-1.5" variant="gray">
                    <a
                      type="button"
                      href={directNaverMapURLAnother}
                      target="_blank"
                      rel="noreferrer"
                      tw="w-full text-center rounded-lg "
                    >
                      길찾기
                    </a>
                  </Button>
                </div>
              </ChatMessage.LinkTag>
            )}

            {variant === 'nego' && !chat.agentReadTime && shouldRenderSentTime && !isChatPhotoLoading && (
              <ChatMessage.ReadIndicator>읽기 전</ChatMessage.ReadIndicator>
            )}

            {shouldRenderSentTime && !isChatPhotoLoading && (
              <ChatMessage.SentTime format="LT">{chat.sentTime}</ChatMessage.SentTime>
            )}
          </ChatMessage>
        </div>

        {openPopupFullImage && imgUrl && (
          <OverlayPresenter>
            <div ref={outsideRef}>
              <Popup.ContentGroup
                tw="[text-align: center]"
                css={[platform === 'mobile' && tw`[max-height: 600px] p-2`]}
              >
                <img
                  src={imgUrl}
                  alt="존재하지 않아요"
                  style={
                    platform === 'mobile'
                      ? {
                          width: '100%',
                          height: '100%',
                          maxHeight: '600px',
                          objectFit: 'contain',
                          borderTopLeftRadius: '8px',
                          borderTopRightRadius: '8px',
                        }
                      : {
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderTopLeftRadius: '8px',
                          borderTopRightRadius: '8px',
                        }
                  }
                />
              </Popup.ContentGroup>
              <Popup.ButtonGroup>
                <Popup.ActionButton
                  onClick={() => {
                    setOpenPopupFullImage(false);
                  }}
                >
                  닫기
                </Popup.ActionButton>
              </Popup.ButtonGroup>
            </div>
          </OverlayPresenter>
        )}
      </>
    );
  },
  (prev, next) =>
    prev.chat.id === next.chat.id &&
    prev.prevChat?.id === next.prevChat?.id &&
    prev.nextChat?.id === next.nextChat?.id &&
    prev.chat.agentReadTime === next.chat.agentReadTime,
);
