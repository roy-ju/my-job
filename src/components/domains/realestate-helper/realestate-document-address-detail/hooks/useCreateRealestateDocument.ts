import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useCreateRealestateDocument() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleCreateDocument = useCallback(
    (dong: string, ho: string) => {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          if (depth1 === Routes.RealestateDocumentAddressDetail) {
            router.push({
              pathname: `/${Routes.RealestateDocumentAddressVerifying}/${depth2}`,
              query: {
                ...query,
                addressData: router.query.addressData,
                ...(dong ? { dong } : {}),
                ...(ho ? { ho } : {}),
              },
            });
          } else {
            router.push({
              pathname: `/${depth1}/${Routes.RealestateDocumentAddressVerifying}`,
              query: {
                ...query,
                addressData: router.query.addressData,
                ...(dong ? { dong } : {}),
                ...(ho ? { ho } : {}),
              },
            });
          }
        } else if (depth1 && !depth2) {
          router.push({
            pathname: `/${Routes.RealestateDocumentAddressVerifying}`,
            query: {
              ...query,
              addressData: router.query.addressData,
              ...(dong ? { dong } : {}),
              ...(ho ? { ho } : {}),
            },
          });
        }
      }

      if (platform === 'mobile') {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.RealestateDocumentAddressVerifying}`,
          query: {
            addressData: router.query.addressData,
            ...(dong ? { dong: dong as string } : {}),
            ...(ho ? { ho: ho as string } : {}),
          },
        });
      }
    },
    [platform, router],
  );

  return { handleCreateDocument };
}
