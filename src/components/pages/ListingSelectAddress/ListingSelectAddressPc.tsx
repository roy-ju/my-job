import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import AuthRequired from '@/components/atoms/AuthRequired';

import { OverlayPresenter, Popup } from '@/components/molecules';

import ListingCreateGuidePopup from '@/components/organisms/popups/ListingCreateGuidePopup';

import SelectAddress from '@/components/domains/listings/SelectAddress';

import useSelectListingAddressHandler from '@/components/domains/listings/select-address/hooks/useSelectListingAddressHandler';

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
    handleClickHome,
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
    </AuthRequired>
  );
}

export default memo(ListingSelectAddressPc);
