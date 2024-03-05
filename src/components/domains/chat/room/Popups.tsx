import { Button } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import CloseIcon from '@/assets/icons/close.svg';

import useChatRoomStore from './hooks/useChatRoomStore';

import usePopupsHandler from './hooks/usePopupsHandler';

import useSendMessageHandler from './hooks/useSendMessageHandler';

type PopupsProps = { handleSendMessage: (v: string) => void };

export default function Popups({ handleSendMessage }: PopupsProps) {
  const store = useChatRoomStore();

  const { handleDeleteByIndex } = useSendMessageHandler();

  const { isLoadingCloseAPI, onClickSendPhotos, onCloseSendPhotosPopup, onClosePopup, onLeaveChatRoom } =
    usePopupsHandler({ callbackFn: handleSendMessage });

  if (!store?.popup) return null;

  const values = store?.photosUrls;

  if (store?.popup) {
    return (
      <OverlayPresenter>
        <Popup>
          {store?.popup === 'send_photo' && values?.length > 0 && (
            <>
              <Popup.ContentGroup tw="[text-align: center]">
                <Popup.SmallTitle>{values?.length || 0}장의 사진을 전송하시겠어요?</Popup.SmallTitle>
                <div>
                  {(values?.length ?? 0) > 0 && (
                    <div tw="flex min-w-0 flex-wrap gap-2">
                      {values.map((item, index) => (
                        <div
                          key={item}
                          tw="relative w-[31.4%] h-24 bg-gray-100 rounded-lg bg-no-repeat bg-center bg-cover"
                          style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${item}')`,
                          }}
                        >
                          <Button
                            onClick={() => handleDeleteByIndex(index)}
                            variant="ghost"
                            size="none"
                            tw="w-5 h-5 bg-white absolute top-2 right-2 [border-radius: 6px] hover:bg-gray-400"
                          >
                            <CloseIcon />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Popup.ContentGroup>

              <Popup.ButtonGroup>
                <Popup.CancelButton onClick={onCloseSendPhotosPopup}>닫기</Popup.CancelButton>
                <Popup.ActionButton onClick={onClickSendPhotos}>확인</Popup.ActionButton>
              </Popup.ButtonGroup>
            </>
          )}

          {store?.popup === 'close_chatroom' && (
            <>
              <Popup.ContentGroup>
                <Popup.SubTitle tw="text-center">채팅방을 나가시겠습니까?</Popup.SubTitle>
              </Popup.ContentGroup>
              <Popup.ButtonGroup>
                <Popup.CancelButton onClick={onClosePopup}>닫기</Popup.CancelButton>
                <Popup.ActionButton isLoading={isLoadingCloseAPI} onClick={onLeaveChatRoom}>
                  나가기
                </Popup.ActionButton>
              </Popup.ButtonGroup>
            </>
          )}
        </Popup>
      </OverlayPresenter>
    );
  }

  return null;
}
