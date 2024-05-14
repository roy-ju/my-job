import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import AuthRequired from '@/components/atoms/AuthRequired';

import { OverlayPresenter } from '@/components/molecules';

import ListingCreateGuidePopup from '@/components/organisms/popups/ListingCreateGuidePopup';

import SelectAddress from '@/components/domains/listings/SelectAddress';

import useSelectListingAddressHandler from '@/components/domains/listings/select-address/hooks/useSelectListingAddressHandler';

import InvalidAccessPopup from '@/components/molecules/CommonPopups/InvalidAccess';

interface Props {
  depth: number;
  panelWidth?: string;
}

function ListingSelectAddressPc({ depth, panelWidth }: Props) {
  const {
    outsideRef,
    showGuidePopup,
    showInActivePopup,
    list,
    selectedUserAddressID,
    handleCloseGuidePopup,
    handleClickAddMyAddress,

    handleNext,
    handleClickItem,
  } = useSelectListingAddressHandler();

  return (
    <AuthRequired depth={depth} ciRequired>
      <Panel width={panelWidth}>
        {!showInActivePopup && (
          <SelectAddress
            type="listing"
            list={list}
            selectedUserAddressID={selectedUserAddressID}
            onClickNext={handleNext}
            onClickItem={handleClickItem}
            onClickAddMyAddress={handleClickAddMyAddress}
          />
        )}

        {showGuidePopup && (
          <OverlayPresenter>
            <ListingCreateGuidePopup
              ref={outsideRef}
              isPopupOpen={showGuidePopup}
              onClickClosePopup={handleCloseGuidePopup}
            />
          </OverlayPresenter>
        )}
      </Panel>

      {showInActivePopup && <InvalidAccessPopup />}
    </AuthRequired>
  );
}

export default memo(ListingSelectAddressPc);
