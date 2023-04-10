import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { ListingCreateForm } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useEffect, useMemo, useState } from 'react';
import useListingCreateForm from './useListingCreateForm';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const {
    popup,
    forms,
    isOwner,
    buyOrRent,
    price,
    monthlyRentFee,
    handleChangeIsOwner,
    handleChangeBuyOrRent,
    handleClickNext,
    handleCancelChangeBuyOrRent,
    handleConfirmChangeBuyOrRent,
    handleChangePrice,
    handleChangeMonthlyRentFee,
  } = useListingCreateForm(depth);

  const [addressData, setAddressData] = useState<KakaoAddressAutocompleteResponseItem | null>(null);

  const addressLine1 = useMemo(() => {
    if (addressData) {
      if (addressData.roadAddressName) {
        return addressData.roadAddressName;
      }
      return addressData.addressName;
    }
    return '';
  }, [addressData]);

  const addressLine2 = useMemo(() => {
    if (addressData && addressData.placeName) {
      return addressData.placeName;
    }
    return '';
  }, [addressData]);

  useEffect(() => {
    const { addressData: inAddressData } = router.query;
    if (!inAddressData) {
      router.replace(Routes.ListingCreateAddress);
    } else {
      const parsed = JSON.parse(inAddressData as string) as KakaoAddressAutocompleteResponseItem;
      setAddressData(parsed);
    }
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <ListingCreateForm
        addressLine1={addressLine1}
        addressLine2={addressLine2}
        forms={forms}
        isOwner={isOwner}
        buyOrRent={buyOrRent}
        price={price}
        monthlyRentFee={monthlyRentFee}
        onClickNext={handleClickNext}
        onChangeIsOwner={handleChangeIsOwner}
        onChangeBuyOrRent={handleChangeBuyOrRent}
        onChangePrice={handleChangePrice}
        onChnageMonthlyRentFee={handleChangeMonthlyRentFee}
      />
      {popup === 'buyOrRentChagne' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-12">
              <Popup.Title>입력하신 값들이 초기화 됩니다.</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handleCancelChangeBuyOrRent}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleConfirmChangeBuyOrRent}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
