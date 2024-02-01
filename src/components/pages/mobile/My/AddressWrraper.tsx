import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { MobAuthRequired } from '@/components/atoms';

import { MobMyAddress } from '@/components/templates';

import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import Routes from '@/router/routes';

export default function AddressWrraper() {
  const router = useRouter();

  const handleSubmit = useCallback(
    (value: KakaoAddressAutocompleteResponseItem) => {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.MyAddressDetail}`,
          query: {
            ...{ addressData: JSON.stringify(value) },
            ...(router?.query?.origin ? { origin: router?.query?.origin as string } : {}),
            ...(router?.query?.danjiID ? { danjiID: router?.query?.danjiID as string } : {}),
            ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
          },
        },
        `/${Routes.EntryMobile}/${Routes.MyAddressDetail}`,
      );
    },
    [router],
  );

  const handleClickBack = () => {
    if (router?.query?.origin) {
      router.replace(router.query.origin as string);
      return;
    }

    router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
  };

  return (
    <MobAuthRequired ciRequired>
      <MobMyAddress onClickBack={handleClickBack} onSubmit={handleSubmit} />
    </MobAuthRequired>
  );
}
