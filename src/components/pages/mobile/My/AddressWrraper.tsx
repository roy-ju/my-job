import { MobAuthRequired } from '@/components/atoms';
import { MobMyAddress } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function AddressWrraper() {
  const router = useRouter();

  const handleClickBack = () => {
    if (router?.query?.origin && typeof router?.query?.origin === 'string') {
      router.replace(router.query.origin);
      return;
    }
    router.replace(`/${Routes.EntryMobile}/${Routes.My}?tab=2`);
  };

  const handleSubmit = useCallback(
    (value: KakaoAddressAutocompleteResponseItem) => {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.MyAddressDetail}`,
          query: router?.query?.origin
            ? { addressData: JSON.stringify(value), origin: router.query.origin as string }
            : { addressData: JSON.stringify(value) },
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
