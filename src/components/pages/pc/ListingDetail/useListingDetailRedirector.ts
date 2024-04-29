import { useState } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { useRouter } from '@/hooks/utils';

import { ListingStatus, VisitUserType } from '@/constants/enums';

import Routes from '@/router/routes';

import useFetchListingStatus from '@/services/listing/useFetchListingStatus';

export default function useListingDetailRedirector(listingID: number, depth: number) {
  const router = useRouter(depth);
  const [redirectable, setRedirectable] = useState(true);

  const { data: statusData } = useFetchListingStatus(listingID);

  useIsomorphicLayoutEffect(() => {
    if (!statusData) return;
    if (statusData.can_access) return;

    const visitUserType = statusData?.visit_user_type;
    const listingStatus = statusData?.status ?? ListingStatus.Active;

    if (visitUserType === VisitUserType.SellerGeneral && listingStatus < ListingStatus.Active) {
      router.replaceCurrent(Routes.ListingCreateResult, { persistParams: true }, false);
      return;
    }

    setRedirectable(false);
  }, [statusData]);
  return {
    redirectable,
  };
}
