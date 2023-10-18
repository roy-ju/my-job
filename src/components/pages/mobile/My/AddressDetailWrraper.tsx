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
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.MyAddressVerifying}`,
      query: {
        ...(router?.query?.addressData ? { addressData: router.query.addressData as string } : {}),
        ...(dong ? { dong: dong as string } : {}),
        ...(ho ? { ho: ho as string } : {}),
        ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
        ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
      },
    });
  }, [router, dong, ho]);

  const handleClickBack = useCallback(() => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
      query: {
        ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
        ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
      },
    });
  }, [router]);

  useEffect(() => {
    const { addressData: inAddressData } = router.query;

    if (!inAddressData) {
      router.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
      });
      return;
    }

    const parsed = JSON.parse(inAddressData as string) as KakaoAddressAutocompleteResponseItem;

    setAddressData(parsed);
  }, [router]);

  return (
    <MobMyAddressDetail
      addressLine1={addressLine1}
      addressLine2={addressLine2}
      dong={dong}
      ho={ho}
      onClickBack={handleClickBack}
      onChangeDong={handleChangeDong}
      onChangeHo={handleChangeHo}
      onSubmit={handleSubmit}
      onSearchAnotherAddress={handleClickBack}
    />
  );
}
