import { OverlayPresenter, Popup } from '@/components/molecules';

interface ConfirmPopupProps {
  onClickCancel?: () => void;
  onClickDeregister?: () => void;
}

export default function ConfirmPopup({ onClickCancel, onClickDeregister }: ConfirmPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.Title tw="text-b2 text-gray-1000 text-center">
            회원 탈퇴 시 ‘구해요 요청’ 과 ‘추천 요청’은 자동 취소
            <br />
            삭제 처리되며, 회원 데이터는 복구되지 않습니다.
            <br />
            정말 회원 탈퇴를 진행하시겠습니까?
          </Popup.Title>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={onClickCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={onClickDeregister}>탈퇴하기</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
