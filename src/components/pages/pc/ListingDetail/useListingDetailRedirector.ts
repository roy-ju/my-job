import useAPI_GetListingStatus from '@/apis/listing/getListingStatus';
import { ListingStatus, VisitUserType } from '@/constants/enums';
import { useIsomorphicLayoutEffect, useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useState } from 'react';

export default function useListingDetailRedirector(listingID: number, depth: number) {
  const router = useRouter(depth);
  const [redirectable, setRedirectable] = useState(true);

  const { data: statusData } = useAPI_GetListingStatus(listingID);

  useIsomorphicLayoutEffect(() => {
    if (!statusData) return;
    if (statusData.can_access) return;

    const visitUserType = statusData?.visit_user_type;
    const listingStatus = statusData?.status ?? ListingStatus.Active;

    if (visitUserType === VisitUserType.SellerGeneral && listingStatus < ListingStatus.Active) {
      router.replaceCurrent(Routes.ListingCreateResult, { persistParams: true });
      return;
    }

    setRedirectable(false);
  }, [statusData]);
  return {
    redirectable,
  };
}
