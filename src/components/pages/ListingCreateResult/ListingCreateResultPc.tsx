import { memo, useEffect } from 'react';

import { useRouter } from 'next/router';

import { AuthRequired } from '@/components/atoms';

import Panel from '@/components/atoms/Panel';

import InvalidAccessPopup from '@/components/molecules/CommonPopups/InvalidAccess';

import ListingCreateResult from '@/components/domains/listings/ListingCreateResult';

import { ListingStatus } from '@/constants/enums';

import useFetchMyListingDetail from '@/services/my/useFetchMyListingDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

function ListingCreateResultPc({ depth, panelWidth }: Props) {
  const router = useRouter();

  const listingID = Number(router.query.listingID) ?? 0;

  const { data, isLoading } = useFetchMyListingDetail(listingID);

  useEffect(() => {
    function redirect() {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        router.replace({ pathname: `/${depth1}`, query });
      } else {
        router.replace({ pathname: `/`, query });
      }
    }

    if (!listingID) {
      redirect();
      return;
    }

    if (data && (data?.listing_status ?? 0) >= ListingStatus.Active) {
      redirect();
    }
  }, [data, listingID, router]);

  if (isLoading || !listingID) return null;

  if (data?.error_code === 2002) return <InvalidAccessPopup />;

  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <ListingCreateResult data={data} />
      </Panel>
    </AuthRequired>
  );
}

export default memo(ListingCreateResultPc);
