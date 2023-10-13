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
      searchParams: router?.query?.redirect ? { redirect: router.query.redirect as string } : undefined,
      state: {
        addressData: router.query.addressData as string,
        dong,
        ho,
        ...(router.query.origin
          ? {
              origin: router.query.origin as string,
            }
          : {}),
      },
    });
  }, [router, dong, ho]);

  const handleBack = useCallback(() => {
    router.replace(Routes.MyAddress, {
      state: {
        ...(router.query.origin
          ? {
              origin: router.query.origin as string,
            }
          : {}),
      },
    });
  }, [router]);

  useEffect(() => {
    const { addressData: inAddressData } = router.query;
    if (!inAddressData) {
      router.replace(Routes.MyAddress, {
        state: {
          ...(router.query.origin
            ? {
                origin: router.query.origin as string,
              }
            : {}),
        },
      });
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
