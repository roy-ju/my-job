import { Panel } from '@/components/atoms';
import { MyAddressDetail } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { ChangeEventHandler, memo, useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const [addressData, setAddressData] = useState<KakaoAddressAutocompleteResponseItem | null>(null);
  const [dong, setDong] = useState('');
  const [ho, setHo] = useState('');

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

  const handleChangeDong = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setDong(e.target.value);
  }, []);

  const handleChangeHo = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setHo(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    router.replace(Routes.MyAddressVerifying, {
      state: {
        addressData: router.query.addressData as string,
        dong,
        ho,
      },
    });
  }, [router, dong, ho]);

  const handleBack = useCallback(() => {
    router.replace(Routes.MyAddress);
  }, [router]);

  useEffect(() => {
    const { addressData: inAddressData } = router.query;
    if (!inAddressData) {
      router.replace(Routes.MyAddress);
    } else {
      const parsed = JSON.parse(inAddressData as string) as KakaoAddressAutocompleteResponseItem;
      setAddressData(parsed);
    }
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <MyAddressDetail
        addressLine1={addressLine1}
        addressLine2={addressLine2}
        errorMessage={
          router.query.errorCode ? '인터넷 등기소에서 응답을 받을 수 없습니다. 잠시 후 다시 시도해주세요.' : undefined
        }
        dong={dong}
        ho={ho}
        onChangeDong={handleChangeDong}
        onChangeHo={handleChangeHo}
        onSubmit={handleSubmit}
        onSearchAnotherAddress={handleBack}
      />
    </Panel>
  );
});
