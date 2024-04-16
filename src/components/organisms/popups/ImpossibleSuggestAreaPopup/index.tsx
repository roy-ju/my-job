import { OverlayPresenter, Popup } from '@/components/molecules';

type ImpossibleSuggestAreaPopupProps = {
  handleClosePopup: () => void;
};

export default function ImpossibleSuggestAreaPopup({ handleClosePopup }: ImpossibleSuggestAreaPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="[text-align: center]">
          <Popup.SmallTitle>해당 지역은 서비스 준비중입니다.</Popup.SmallTitle>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleClosePopup}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
