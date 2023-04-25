import { OverlayPresenter, Popup, NavigationHeader } from '@/components/molecules';

interface Props {
  tabStatus: number;
  isDeleteActive: boolean;
  isPopupActive: boolean;
  onDeleteListingList: () => void;
  onActiveDelete: () => void;
  onCancelDelete: () => void;
  onOpenPopup: () => void;
  onClosePopup: () => void;
}

export default function HeaderRenderer({
  tabStatus,
  isDeleteActive,
  isPopupActive,
  onDeleteListingList,
  onActiveDelete,
  onCancelDelete,
  onClosePopup,
  onOpenPopup,
}: Props) {
  if (tabStatus === 1) {
    if (isDeleteActive) {
      return (
        <>
          <NavigationHeader>
            <NavigationHeader.Title>등록한 매물</NavigationHeader.Title>
            <NavigationHeader.Button onClick={onCancelDelete} tw="underline text-b2 mr-3 text-gray-1000">
              취소
            </NavigationHeader.Button>
            <NavigationHeader.Button onClick={onOpenPopup} tw="underline text-b2 text-gray-1000">
              삭제하기
            </NavigationHeader.Button>
          </NavigationHeader>

          {isPopupActive && (
            <OverlayPresenter>
              <Popup>
                <Popup.ContentGroup>
                  <Popup.Title>선택한 항목을 목록에서 삭제하시겠습니까?</Popup.Title>
                </Popup.ContentGroup>
                <Popup.ButtonGroup>
                  <Popup.CancelButton onClick={onClosePopup}>취소</Popup.CancelButton>
                  <Popup.ActionButton onClick={onDeleteListingList}>삭제하기</Popup.ActionButton>
                </Popup.ButtonGroup>
              </Popup>
            </OverlayPresenter>
          )}
        </>
      );
    }

    return (
      <NavigationHeader>
        <NavigationHeader.Title>등록한 매물</NavigationHeader.Title>
        <NavigationHeader.Button onClick={onActiveDelete} tw="underline text-b2 text-gray-1000">
          선택삭제
        </NavigationHeader.Button>
      </NavigationHeader>
    );
  }

  return (
    <NavigationHeader>
      <NavigationHeader.Title>등록한 매물</NavigationHeader.Title>
    </NavigationHeader>
  );
}
