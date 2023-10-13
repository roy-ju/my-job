import { MobMyAddressDetail } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import React, { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

export default function AddressDetailWrraper() {
  const router = useRouter();
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
    router.push(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.MyAddressVerifying}`,
        query: { addressData: router.query.addressData as string, dong, ho },
      },
      `/${Routes.EntryMobile}/${Routes.MyAddressVerifying}`,
    );
  }, [router, dong, ho]);

  const handleSearchAnotherAddress = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.MyAddress}`);
  }, [router]);

  useEffect(() => {
    const { addressData: inAddressData } = router.query;
    if (!inAddressData) {
      router.replace(`/${Routes.EntryMobile}/${Routes.MyAddress}`);
    } else {
      const parsed = JSON.parse(inAddressData as string) as KakaoAddressAutocompleteResponseItem;
      setAddressData(parsed);
    }
  }, [router]);

  return (
    <MobMyAddressDetail
      addressLine1={addressLine1}
      addressLine2={addressLine2}
      dong={dong}
      ho={ho}
      onClickBack={handleSearchAnotherAddress}
      onChangeDong={handleChangeDong}
      onChangeHo={handleChangeHo}
      onSubmit={handleSubmit}
      onSearchAnotherAddress={handleSearchAnotherAddress}
    />
  );
}
