import { MobileContainer } from '@/components/atoms';
import { ListingCreateAddress } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect } from 'react';

export default memo(() => {
  const router = useRouter();
  const listingID = Number(router.query.listingID) ?? 0;

  const handleSubmit = useCallback(
    (value: KakaoAddressAutocompleteResponseItem) => {
      router.replace(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateUpdateAddressDetail}`,
          query: {
            listingID: `${listingID}`,
            addressData: JSON.stringify(value),
          },
        },
        `/${Routes.EntryMobile}/${Routes.ListingCreateUpdateAddressDetail}?listingID=${listingID}`,
      );
    },
    [router, listingID],
  );

  useEffect(() => {
    if (!listingID) {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
    }
  }, [router, listingID]);

  return (
    <MobileContainer>
      <ListingCreateAddress onSubmit={handleSubmit} />
    </MobileContainer>
  );
});
