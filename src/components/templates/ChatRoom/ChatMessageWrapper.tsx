/* eslint-disable @next/next/no-img-element */
import { ChatMessage } from '@/components/organisms';
import { ChatUserType } from '@/constants/enums';
import { StaticImageData } from 'next/image';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { formatLastMessageTime } from '@/utils/formatLastMessageTime';
import { Moment } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { useIsomorphicLayoutEffect, useOutsideClick } from '@/hooks/utils';
import { checkPlatform } from '@/utils/checkPlatform';
import tw from 'twin.macro';

export interface IChatMessage {
  id: number;
  chatUserType: ChatUserType;
  profileImagePath?: string | StaticImageData;
  name: string;
  message: string;
  sentTime: string;
  agentReadTime: Date | null;
}

const variantByType: Record<ChatUserType, 'gray' | 'nego' | 'system'> = {
  [ChatUserType.Agent]: 'gray',
  [ChatUserType.Buyer]: 'nego',
  [ChatUserType.Seller]: 'nego',
  [ChatUserType.System]: 'system',
};

export default memo(
  ({ chat, prevChat, nextChat }: { chat: IChatMessage; prevChat?: IChatMessage; nextChat?: IChatMessage }) => {
    const photoWrraperRef = useRef<HTMLDivElement | null>(null);
    const outsideRef = useRef<HTMLDivElement | null>(null);

    const variant = useMemo(() => variantByType[chat.chatUserType] ?? 'system', [chat.chatUserType]);

    const [imgUrl, setImgUrl] = useState('');

    const [imgError, setImgError] = useState(false);

    const [openPopupFullImage, setOpenPopupFullImage] = useState(false);

    const [platform, setCheckPlatform] = useState('');

    const shouldRenderAvatar = useMemo(() => {
      if (chat.chatUserType === ChatUserType.Agent) {
        if (!prevChat) return true;
        if (prevChat.chatUserType !== chat.chatUserType) return true;
      }
      return false;
    }, [chat, prevChat]);

    const shouldRenderSentTime = useMemo(() => {
      if (!nextChat) return true;
      if (nextChat.chatUserType !== chat.chatUserType) return true;
      if (formatLastMessageTime(nextChat.sentTime) !== formatLastMessageTime(chat.sentTime)) return true;
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
          {shouldRenderDate && (
            <div tw="py-7 text-center text-info leading-3">
              <Moment format="yyyy년 MM월 DD일">{chat.sentTime}</Moment>
            </div>
          )}

          <ChatMessage variant={variant}>
            {shouldRenderAvatar && <ChatMessage.Avatar src={chat.profileImagePath} />}
            {shouldRenderAvatar && <ChatMessage.SenderName>{chat.name}</ChatMessage.SenderName>}
            {!isChatMessage &&
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
            {isChatMessage && <ChatMessage.Bubble>{chat.message}</ChatMessage.Bubble>}

            {variant === 'nego' && !chat.agentReadTime && shouldRenderSentTime && (
              <ChatMessage.ReadIndicator>읽기 전</ChatMessage.ReadIndicator>
            )}

            {shouldRenderSentTime && <ChatMessage.SentTime format="LT">{chat.sentTime}</ChatMessage.SentTime>}
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
