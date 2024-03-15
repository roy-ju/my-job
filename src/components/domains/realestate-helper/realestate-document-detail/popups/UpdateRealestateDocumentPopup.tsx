import Loading from '@/components/atoms/Loading';

import { Popup, OverlayPresenter } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

interface UpdateRealestateDocumentPopupProps extends CommonPopupProps {
  loading: boolean;
}

export default function UpdateRealestateDocumentPopup({
  loading,
  handleCancel,
  handleConfirm,
}: UpdateRealestateDocumentPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>등기부를 업데이트 하시겠어요?</Popup.Title>
          <Popup.Body>
            등기부를 업데이트 하면 등기부 무료 조회수가 1회 차감됩니다. 해당 주소로 등기부를 업데이트 하시겠어요?
          </Popup.Body>
        </Popup.ContentGroup>
        {loading ? (
          <Popup.ButtonGroup>
            <Popup.ActionButton>
              <Loading size="small" />
            </Popup.ActionButton>
          </Popup.ButtonGroup>
        ) : (
          <Popup.ButtonGroup>
            <Popup.CancelButton onClick={handleCancel}>취소</Popup.CancelButton>
            <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        )}
      </Popup>
    </OverlayPresenter>
  );
}
