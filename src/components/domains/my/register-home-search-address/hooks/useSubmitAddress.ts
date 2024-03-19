import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import Routes from '@/router/routes';

export default function useSummitAddress() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleSubmitAddress = useCallback(
    (value: KakaoAddressAutocompleteResponseItem) => {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        const convertedQuery = {
          ...query,
          addressData: JSON.stringify(value),
          ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          ...(router?.query?.suggestID ? { suggestID: router.query.suggestID as string } : {}),
          ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
        };

        if (depth1 && depth2) {
          if (depth1 === Routes.MyAddress) {
            router.push({
              pathname: `/${Routes.MyAddressDetail}/${depth2}`,
              query: convertedQuery,
            });
          } else {
            router.push({
              pathname: `/${depth1}/${Routes.MyAddressDetail}`,
              query: convertedQuery,
            });
          }
        } else if (depth1 && !depth2) {
          router.push({
            pathname: `/${Routes.MyAddressDetail}`,
            query: convertedQuery,
          });
        }
        return;
      }

      if (platform === 'mobile') {
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
      }
    },
    [platform, router],
  );

  return { handleSubmitAddress };
}
