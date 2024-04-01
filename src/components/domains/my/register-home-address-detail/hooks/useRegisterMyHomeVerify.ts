import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useRegisterMyHomeVerify() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleVerifyMyHome = useCallback(
    (dong: string, ho: string) => {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';

        const query = router.query;

        delete query.depth1;
        delete query.depth2;
        delete query.dong;
        delete query.ho;

        const convertedQuery = {
          ...query,
          addressData: router.query.addressData,
          ...(dong ? { dong } : {}),
          ...(ho ? { ho } : {}),
          ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
          ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
        };

        if (depth1 && depth2) {
          if (depth1 === Routes.MyAddressDetail) {
            router.push({
              pathname: `/${Routes.MyAddressVerifying}/${depth2}`,
              query: convertedQuery,
            });
          } else {
            router.push({
              pathname: `/${depth1}/${Routes.MyAddressVerifying}`,
              query: convertedQuery,
            });
          }
        } else if (depth1 && !depth2) {
          router.push({
            pathname: `/${Routes.MyAddressVerifying}`,
            query: convertedQuery,
          });
        }
      }

      if (platform === 'mobile') {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.MyAddressVerifying}`,
          query: {
            addressData: router.query.addressData,
            ...(dong ? { dong: dong as string } : {}),
            ...(ho ? { ho: ho as string } : {}),
            ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
            ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
            ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
          },
        });
      }
    },
    [platform, router],
  );

  return { handleVerifyMyHome };
}
