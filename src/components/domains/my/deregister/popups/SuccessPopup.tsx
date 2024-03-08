import { OverlayPresenter, Popup } from '@/components/molecules';

interface SuccessPopupProps {
  onClickNavigateToHome?: () => void;
}

export default function SuccessPopup({ onClickNavigateToHome }: SuccessPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title tw="text-gray-1000">회원탈퇴 완료</Popup.Title>
          <Popup.Body>다음에 네고시오를 다시 찾아주세요.</Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={onClickNavigateToHome}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
