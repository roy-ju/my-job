import { useState } from 'react';

import { useRouter } from 'next/router';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { ListingStatus, VisitUserType } from '@/constants/enums';

import useAPI_GetListingStatus from '@/apis/listing/getListingStatus';

import Routes from '@/router/routes';

export default function useListingDetailRedirector(listingID: number) {
  const router = useRouter();
  const [redirectable, setRedirectable] = useState(true);

  const { data: statusData } = useAPI_GetListingStatus(listingID);

  useIsomorphicLayoutEffect(() => {
    if (!statusData) return;
    if (statusData.can_access) return;

    const visitUserType = statusData?.visit_user_type;
    const listingStatus = statusData?.status ?? ListingStatus.Active;

    if (visitUserType === VisitUserType.SellerGeneral && listingStatus < ListingStatus.Active) {
      router.replace(`/${Routes.EntryMobile}/${Routes.ListingCreateResult}?listingID=${listingID}`);
      return;
    }

    setRedirectable(false);
  }, [statusData]);
  return {
    redirectable,
  };
}
