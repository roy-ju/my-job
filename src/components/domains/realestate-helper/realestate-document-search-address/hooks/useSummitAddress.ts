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

        if (depth1 && depth2) {
          if (depth1 === Routes.RealestateDocumentSearchAddress) {
            router.push({
              pathname: `/${Routes.RealestateDocumentAddressDetail}/${depth2}`,
              query: { ...query, addressData: JSON.stringify(value) },
            });
          } else {
            router.push({
              pathname: `/${depth1}/${Routes.RealestateDocumentAddressDetail}`,
              query: { ...query, addressData: JSON.stringify(value) },
            });
          }
        } else if (depth1 && !depth2) {
          router.push({
            pathname: `/${Routes.RealestateDocumentAddressDetail}`,
            query: { ...query, addressData: JSON.stringify(value) },
          });
        }
      }

      if (platform === 'mobile') {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.RealestateDocumentAddressDetail}`,
          query: { addressData: JSON.stringify(value) },
        });
      }
    },
    [platform, router],
  );

  return { handleSubmitAddress };
}
