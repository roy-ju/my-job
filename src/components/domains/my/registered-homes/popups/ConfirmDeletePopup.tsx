import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

interface ConfirmDeletePopupProps extends CommonPopupProps {
  address: string;
}

export default function ConfirmDeletePopup({ address, handleCancel, handleConfirm }: ConfirmDeletePopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-6 gap-2">
          <Popup.Title>등록된 우리집을 삭제하시겠습니까?</Popup.Title>
          <div tw="flex gap-1 font-bold">
            <Popup.Body tw="text-nego-1000 whitespace-nowrap">등록된 주소 :</Popup.Body>
            <Popup.Body tw="text-nego-1000">{address}</Popup.Body>
          </div>
          <Popup.Body tw="text-justify">
            기존에 추천, 혹은 등록된 매물은 계속 거래 가능합니다.
            <br />
            신규추천이나 매물등록을 위해서는 우리집등록을 다시 진행하셔야 합니다.
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
