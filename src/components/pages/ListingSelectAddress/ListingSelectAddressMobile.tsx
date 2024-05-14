import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

import useSelectListingAddressHandler from '@/components/domains/listings/select-address/hooks/useSelectListingAddressHandler';

import SelectAddress from '@/components/domains/listings/SelectAddress';

import ListingCreateGuideMobilePopup from '@/components/organisms/popups/ListingCreateGuideMobilePopup';

import InvalidAccessPopup from '@/components/molecules/CommonPopups/InvalidAccess';

export default function ListingSelectAddressMobile() {
  const {
    showGuidePopup,
    showInActivePopup,
    list,
    selectedUserAddressID,
    handleCloseGuidePopup,
    handleClickAddMyAddress,
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

        {showInActivePopup && <InvalidAccessPopup />}
      </MobileContainer>
    </MobAuthRequired>
  );
}
