import { Panel } from '@/components/atoms';
import { Listings } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { MapLayout } from '@/layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { useCallback } from 'react';

const ListingsPage: NextPageWithLayout = ({ children }) => {
  const router = useRouter();

  const onClickGoBack = useCallback(() => {
    router.navigate('/');
  }, [router]);

  const onClickListingDetail = useCallback(() => {
    router.navigate({
      pathname: 'listings/[id]',
      query: {
        ...router.query,
        id: 1,
      },
    });
  }, [router]);

  return (
    <>
      {router.query.listOpen === 'true' && (
        <Panel>
          <Listings
            onClickGoBack={onClickGoBack}
            onClickListingDetail={onClickListingDetail}
          />
        </Panel>
      )}
      {children}
    </>
  );
};

ListingsPage.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export default ListingsPage;
