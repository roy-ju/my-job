import { Panel } from '@/components/atoms';
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
  const [addressData, setAddressData] = useState<KakaoAddressAutocompleteResponseItem | null>(null);

  const { forms, isOwner, handleChangeIsOwner, handleClickNext } = useListingCreateForm();

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
        onClickNext={handleClickNext}
        onChangeIsOwner={handleChangeIsOwner}
      />
    </Panel>
  );
});
