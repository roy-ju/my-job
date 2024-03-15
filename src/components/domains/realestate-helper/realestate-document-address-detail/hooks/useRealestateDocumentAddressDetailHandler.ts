import { useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import Routes from '@/router/routes';

export default function useRealestateDocumentAddressDetailHandler() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const [addressData, setAddressData] = useState<KakaoAddressAutocompleteResponseItem | null>(null);

  const addressLine1 = useMemo(() => {
    if (addressData && addressData?.roadAddressName) {
      return addressData.roadAddressName;
    }

    if (addressData && addressData?.addressName) {
      return addressData.addressName;
    }

    return '';
  }, [addressData]);

  const addressLine2 = useMemo(() => {
    if (addressData && addressData?.placeName) {
      return addressData.placeName;
    }

    return '';
  }, [addressData]);

  useEffect(() => {
    const { addressData: inAddressData } = router.query;

    if (!inAddressData) {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          if (depth1 === Routes.RealestateDocumentAddressDetail) {
            router.replace({
              pathname: `/${Routes.RealestateDocumentSearchAddress}/${depth2}`,
              query: { ...query },
            });
          } else {
            router.replace({
              pathname: `/${depth1}/${Routes.RealestateDocumentSearchAddress}`,
              query: { ...query },
            });
          }
        } else if (depth1 && !depth2) {
          router.replace({
            pathname: `/${Routes.RealestateDocumentSearchAddress}`,
            query: { ...query },
          });
        }
      }

      if (platform === 'mobile') {
        router.replace(`/${Routes.EntryMobile}/${Routes.RealestateDocumentSearchAddress}`);
        return;
      }

      return;
    }

    const parsed = JSON.parse(inAddressData as string) as KakaoAddressAutocompleteResponseItem;

    setAddressData(parsed);
  }, [platform, router]);

  return { addressLine1, addressLine2 };
}
