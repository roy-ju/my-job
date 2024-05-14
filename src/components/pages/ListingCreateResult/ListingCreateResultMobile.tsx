import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { MobAuthRequired } from '@/components/atoms';

import MobileContainer from '@/components/atoms/MobileContainer';

import InvalidAccessPopup from '@/components/molecules/CommonPopups/InvalidAccess';

import ListingCreateResult from '@/components/domains/listings/ListingCreateResult';

import { ListingStatus } from '@/constants/enums';

import useFetchMyListingDetail from '@/services/my/useFetchMyListingDetail';

import Routes from '@/router/routes';

export default function ListingCreateResultMobile() {
  const router = useRouter();

  const listingID = Number(router.query.listingID) ?? 0;

  const { data, isLoading } = useFetchMyListingDetail(listingID);

  useEffect(() => {
    function redirect() {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
    }

    if (!listingID) {
      redirect();
      return;
    }

    if (data && (data?.listing_status ?? 0) >= ListingStatus.Active) {
      redirect();
    }
  }, [data, listingID, router]);

  if (!listingID) return null;

  if (isLoading || !listingID) return null;

  if (data?.error_code === 2002) return <InvalidAccessPopup />;

  return (
    <MobAuthRequired>
      <MobileContainer>
        <ListingCreateResult data={data} />
      </MobileContainer>
    </MobAuthRequired>
  );
}
