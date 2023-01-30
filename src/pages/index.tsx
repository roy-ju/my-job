import { Panel } from '@/components/atoms';
import { Home } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { MapLayout } from '@/layouts';
import { useCallback } from 'react';
import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();

  const onClickMyPage = useCallback(() => {
    router.push('my');
  }, [router]);

  const onClickListingDetail = useCallback(() => {
    router.push('listingDetail', {
      listingID: 1,
    });
  }, [router]);

  const onClickListings = useCallback(() => {
    router.push('listings');
  }, [router]);

  return (
    <Panel>
      <Home
        onClickListingDetail={onClickListingDetail}
        onClickMyPage={onClickMyPage}
        onClickListings={onClickListings}
      />
    </Panel>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export default HomePage;
