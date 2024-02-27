import { OverlayPresenter, Popup } from '@/components/molecules';

export default function InValidAccessPopup({ handleConfirm }: { handleConfirm: () => void }) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-6">
          <Popup.SubTitle tw="text-center">
            현재 로그인 계정으로는
            <br />
            접근이 불가능한 페이지입니다.
          </Popup.SubTitle>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>네고시오 홈으로 돌아가기</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
