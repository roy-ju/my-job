import { MobAuthRequired, MobileContainer } from '@/components/atoms';
import { MobListingCreateAddress } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const ListingCreateAddress = () => {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  const handleSubmit = useCallback(
    (value: KakaoAddressAutocompleteResponseItem) => {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateAddressDetail}`,
          query: {
            addressData: JSON.stringify(value),
          },
        },
        `/${Routes.EntryMobile}/${Routes.ListingCreateAddressDetail}`,
      );
    },
    [router],
  );

  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        <MobListingCreateAddress onSubmit={handleSubmit} onClickBack={handleClickBack} />
      </MobileContainer>
    </MobAuthRequired>
  );
};

export default ListingCreateAddress;
