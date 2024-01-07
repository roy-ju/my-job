import { OverlayPresenter, Popup } from '@/components/molecules';

type ReselectConfirmPopupProps = {
  onClickClose: () => void;
  onClickComfirm: () => void;
};

export default function ReselectConfirmPopup({ onClickClose, onClickComfirm }: ReselectConfirmPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.SmallTitle tw="text-center">
            추천받을 위치를 변경하시면 처음부터 다시 입력하셔야 합니다. 추천받을 위치를 변경하시겠습니까?
          </Popup.SmallTitle>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={onClickClose}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={onClickComfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
