import { OverlayPresenter, Popup } from '@/components/molecules';

type QuitConfirmPopupProps = {
  onClickClose: () => void;
  onClickConfirm: () => void;
};

export default function QuitConfirmPopup({ onClickClose, onClickConfirm }: QuitConfirmPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.SmallTitle>집구하기를 종료하시겠습니까?</Popup.SmallTitle>
          <Popup.Body>
            집구하기를 종료하시면 입력하신 내용이 모두 삭제됩니다.
            <br />
            입력하신 내용을 확인 또는 수정하시려면 화면을 위로 이동해 주세요.
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={onClickClose}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={onClickConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
