import { OverlayPresenter, Popup } from '@/components/molecules';

type ReselectRegionPopupProps = {
  onClickClose: () => void;
  onClickComfirm: () => void;
};

export default function ReselectRegionPopup({ onClickClose, onClickComfirm }: ReselectRegionPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>지역을 재선택 하시겠어요?</Popup.Title>
          <Popup.Body>
            지역을 재선택하시면 선택한 지역이 모두 삭제되며 처음부터 다시 선택하셔야 합니다. 지역을 재선택할까요?
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={onClickClose}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={onClickComfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
