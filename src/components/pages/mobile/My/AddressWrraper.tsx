import { MobAuthRequired } from '@/components/atoms';
import { MobMyAddress } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function AddressWrraper() {
  const router = useRouter();

  const handleClickBack = () => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
      }
    }
  };

  const handleSubmit = useCallback(
    (value: KakaoAddressAutocompleteResponseItem) => {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.MyAddressDetail}`,
          query: { addressData: JSON.stringify(value) },
        },
        `/${Routes.EntryMobile}/${Routes.MyAddressDetail}`,
      );
    },
    [router],
  );

  return (
    <MobAuthRequired ciRequired>
      <MobMyAddress onClickBack={handleClickBack} onSubmit={handleSubmit} />
    </MobAuthRequired>
  );
}
