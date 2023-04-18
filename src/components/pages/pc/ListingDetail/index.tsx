import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import { Panel } from '@/components/atoms';
import { ListingDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  listingID: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth, listingID }: Props) => {
  const router = useRouter(depth);

  const { data, isLoading } = useAPI_GetListingDetail(listingID);

  const handleClickCta = useCallback(() => {
    router.push(Routes.BiddingForm, {
      searchParams: {
        listingID: router.query.listingID as string,
      },
    });
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <ListingDetail
        listing={data?.listing}
        visitUserType={data?.visit_user_type}
        isLoading={isLoading}
        onClickCta={handleClickCta}
      />
    </Panel>
  );
});
