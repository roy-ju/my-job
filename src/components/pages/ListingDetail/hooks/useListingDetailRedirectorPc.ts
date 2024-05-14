import { useState } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { useRouter } from 'next/router';

import { ListingStatus } from '@/constants/enums';

import Routes from '@/router/routes';

import useFetchListingStatus from '@/services/listing/useFetchListingStatus';

export default function useListingDetailRedirectorPc(listingID: number) {
  const router = useRouter();

  const [redirectable, setRedirectable] = useState(true);

  const { data: statusData } = useFetchListingStatus(listingID);

  useIsomorphicLayoutEffect(() => {
    if (!statusData) return;

    if (statusData.can_access) return;

    const listingStatus = statusData?.status ?? ListingStatus.Active;

    if (listingStatus < ListingStatus.Active) {
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      router.replace({ pathname: `/${Routes.My}/${Routes.ListingCreateResult}`, query: { ...query } });

      return;
    }

    if (listingStatus === ListingStatus.Cancelled || listingStatus === ListingStatus.ContractComplete) {
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      router.replace({ pathname: `/${Routes.My}/${Routes.ListingDetailPassed}`, query: { ...query } });

      return;
    }

    setRedirectable(false);
  }, [statusData]);

  return {
    redirectable,
  };
}
