import { OverlayPresenter, Popup, NavigationHeader } from '@/components/molecules';

interface Props {
  hasRegisteringListing: boolean;
  tabStatus: number;
  isDeleteActive: boolean;
  isPopupActive: boolean;
  onDeleteListingList: () => void;
  onActiveDelete: () => void;
  onCancelDelete: () => void;
  onOpenPopup: () => void;
  onClosePopup: () => void;
  onClickBack?: () => void;
}

export default function HeaderRenderer({
  hasRegisteringListing = false,
  tabStatus,
  isDeleteActive,
  isPopupActive,
  onDeleteListingList,
  onActiveDelete,
  onCancelDelete,
  onClosePopup,
  onOpenPopup,
  onClickBack,
}: Props) {
  if (hasRegisteringListing && tabStatus === 1) {
    if (isDeleteActive) {
      return (
        <>
          <NavigationHeader>
            {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
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
                  <Popup.Title tw="text-b2 [text-align: center]">등록신청 매물 삭제</Popup.Title>
                  <Popup.Body>등록이 자동으로 취소되며 복구되지 않습니다. 정말 삭제하시겠습니까?</Popup.Body>
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
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>등록한 매물</NavigationHeader.Title>
        <NavigationHeader.Button onClick={onActiveDelete} tw="underline text-b2 text-gray-1000">
          선택삭제
        </NavigationHeader.Button>
      </NavigationHeader>
    );
  }

  return (
    <NavigationHeader>
      {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
      <NavigationHeader.Title>등록한 매물</NavigationHeader.Title>
    </NavigationHeader>
  );
}
