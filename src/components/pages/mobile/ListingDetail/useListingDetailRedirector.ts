import useAPI_GetListingStatus from '@/apis/listing/getListingStatus';
import { ListingStatus, VisitUserType } from '@/constants/enums';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
