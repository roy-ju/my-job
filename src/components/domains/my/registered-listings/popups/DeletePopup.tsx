import { OverlayPresenter, Popup } from '@/components/molecules';

type DeletePopupProps = {
  handleConfirm: () => void;
  handleCancel: () => void;
};

export default function DeletePopup({ handleConfirm, handleCancel }: DeletePopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.Title tw="text-b2 [text-align: center]">등록신청 매물 삭제</Popup.Title>
          <Popup.Body>등록이 자동으로 취소되며 복구되지 않습니다. 정말 삭제하시겠습니까?</Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleConfirm}>삭제하기</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
