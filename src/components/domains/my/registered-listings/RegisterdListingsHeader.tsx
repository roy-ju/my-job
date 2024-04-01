import { NavigationHeader } from '@/components/molecules';

import DeletePopup from './popups/DeletePopup';

type RegisterdListingsHeaderProps = {
  hasRegisteringListing: boolean;

  tabStatus: number;

  isDeleteActive: boolean;
  isPopupActive: boolean;

  handleClickBack: () => void;

  handleDeleteListingList: () => void;

  handleActiveDelete: () => void;
  handleCancelDelete: () => void;

  handleOpenPopup: () => void;
  handleClosePopup: () => void;
};

export default function RegisterdListingsHeader({
  hasRegisteringListing = false,

  tabStatus,

  isDeleteActive,
  isPopupActive,

  handleClickBack,

  handleDeleteListingList,

  handleActiveDelete,
  handleCancelDelete,

  handleOpenPopup,
  handleClosePopup,
}: RegisterdListingsHeaderProps) {
  if (hasRegisteringListing && tabStatus === 1) {
    if (isDeleteActive) {
      return (
        <>
          <NavigationHeader>
            <NavigationHeader.BackButton onClick={handleClickBack} />
            <NavigationHeader.Title>등록한 매물</NavigationHeader.Title>
            <NavigationHeader.Button onClick={handleCancelDelete} tw="underline text-b2 mr-3 text-gray-1000">
              취소
            </NavigationHeader.Button>
            <NavigationHeader.Button onClick={handleOpenPopup} tw="underline text-b2 text-gray-1000">
              삭제하기
            </NavigationHeader.Button>
          </NavigationHeader>

          {isPopupActive && <DeletePopup handleConfirm={handleDeleteListingList} handleCancel={handleClosePopup} />}
        </>
      );
    }

    return (
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>등록한 매물</NavigationHeader.Title>
        <NavigationHeader.Button onClick={handleActiveDelete} tw="underline text-b2 text-gray-1000">
          선택삭제
        </NavigationHeader.Button>
      </NavigationHeader>
    );
  }

  return (
    <NavigationHeader>
      <NavigationHeader.BackButton onClick={handleClickBack} />
      <NavigationHeader.Title>등록한 매물</NavigationHeader.Title>
    </NavigationHeader>
  );
}
