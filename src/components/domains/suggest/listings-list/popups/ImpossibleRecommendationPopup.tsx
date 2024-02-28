import { OverlayPresenter, Popup } from '@/components/molecules';

export default function ImpossibleRecommendationPopup({ handleClickConfirm }: { handleClickConfirm: () => void }) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="[text-align: center]">
          <Popup.SmallTitle>해당 지역은 서비스 준비중입니다.</Popup.SmallTitle>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleClickConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
