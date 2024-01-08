import { OverlayPresenter, Popup } from '@/components/molecules';

type RealestateTypeChangePopupProps = {
  onClickClose: () => void;
  onClickConfirm: () => void;
};

export default function RealestateTypeChangePopup({ onClickClose, onClickConfirm }: RealestateTypeChangePopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.SmallTitle tw="text-center">
            부동산 종류를 변경하시면 처음부터 다시 입력하셔야 합니다. 부동산 종류를 변경하시겠습니까?
          </Popup.SmallTitle>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={onClickClose}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={onClickConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
