import { NextPageWithLayout } from '@/pages/_app';

import ListingDetailPassed from '@/components/pages/ListingDetailPassed/ListingDetailPassedMobile';

const Page: NextPageWithLayout = () => <ListingDetailPassed />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
