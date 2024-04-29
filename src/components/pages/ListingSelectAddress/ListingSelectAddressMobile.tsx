import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

import { OverlayPresenter, Popup } from '@/components/molecules';

import useSelectListingAddressHandler from '@/components/domains/listings/select-address/hooks/useSelectListingAddressHandler';

import SelectAddress from '@/components/domains/listings/SelectAddress';

import ListingCreateGuideMobilePopup from '@/components/organisms/popups/ListingCreateGuideMobilePopup';

export default function ListingSelectAddressMobile() {
  const {
    showGuidePopup,
    showInActivePopup,
    list,
    selectedUserAddressID,
    handleCloseGuidePopup,
    handleClickAddMyAddress,
    handleClickHome,
    handleClickBack,
    handleNext,
    handleClickItem,
  } = useSelectListingAddressHandler();

  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        {showGuidePopup && (
          <ListingCreateGuideMobilePopup onClickBack={handleClickBack} onClickListingCreate={handleCloseGuidePopup} />
        )}

        {!showInActivePopup && !showGuidePopup && (
          <SelectAddress
            type="listing"
            list={list}
            onClickBack={handleClickBack}
            selectedUserAddressID={selectedUserAddressID}
            onClickNext={handleNext}
            onClickItem={handleClickItem}
            onClickAddMyAddress={handleClickAddMyAddress}
          />
        )}

        {showInActivePopup && (
          <OverlayPresenter>
            <Popup>
              <Popup.ContentGroup tw="py-6">
                <Popup.SubTitle tw="text-center">유효하지 않은 페이지입니다.</Popup.SubTitle>
              </Popup.ContentGroup>
              <Popup.ButtonGroup>
                <Popup.ActionButton onClick={handleClickHome}>네고시오 홈으로 돌아가기</Popup.ActionButton>
              </Popup.ButtonGroup>
            </Popup>
          </OverlayPresenter>
        )}
      </MobileContainer>
    </MobAuthRequired>
  );
}
