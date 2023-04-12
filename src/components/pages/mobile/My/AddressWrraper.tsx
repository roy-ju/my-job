import { MobMyAddress } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function AddressWrraper() {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  const handleSubmit = useCallback(
    (value: KakaoAddressAutocompleteResponseItem) => {
      router.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.My}/${Routes.MyAddressDetailMobile}`,
        query: { addressData: JSON.stringify(value) },
      });
    },
    [router],
  );

  return <MobMyAddress onClickBack={handleClickBack} onSubmit={handleSubmit} />;
}
