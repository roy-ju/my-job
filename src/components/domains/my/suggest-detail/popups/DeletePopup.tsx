import { OverlayPresenter, Popup } from '@/components/molecules';

type DeletePopupProps = {
  handleClickCancel?: () => void;
  handleClickConfirm?: () => void;
};

function DeletePopup({ handleClickCancel, handleClickConfirm }: DeletePopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-6">
          <Popup.SubTitle tw="text-center">요청을 취소하시겠습니까?</Popup.SubTitle>
          <Popup.Body>
            요청 상세 및 추천받은 내역이 삭제됩니다. 신규 추천을 그만 받고 싶다면 요청을 중단해주세요.
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleClickCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleClickConfirm}>요청취소</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}

export default DeletePopup;
