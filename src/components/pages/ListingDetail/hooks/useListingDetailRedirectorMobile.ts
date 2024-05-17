import { useState } from 'react';

import { useRouter } from 'next/router';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import useFetchListingStatus from '@/services/listing/useFetchListingStatus';

import { ListingStatus } from '@/constants/enums';

import Routes from '@/router/routes';

export default function useListingDetailRedirectorMobile(listingID: number) {
  const router = useRouter();

  const [redirectable, setRedirectable] = useState(true);

  const { data: statusData } = useFetchListingStatus(listingID);

  useIsomorphicLayoutEffect(() => {
    if (!statusData) return;

    if (statusData.can_access) {
      setRedirectable(false);
      return;
    }

    const listingStatus = statusData?.status ?? ListingStatus.Active;

    if (listingStatus < ListingStatus.Active) {
      router.replace(`/${Routes.EntryMobile}/${Routes.ListingCreateResult}?listingID=${listingID}`);
      return;
    }

    if (listingStatus === ListingStatus.Cancelled || listingStatus === ListingStatus.ContractComplete) {
      router.replace(`/${Routes.EntryMobile}/${Routes.ListingDetailPassed}?listingID=${listingID}`);
      return;
    }

    setRedirectable(false);
  }, [statusData]);
  return {
    redirectable,
  };
}
