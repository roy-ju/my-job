import { NextPageWithLayout } from '@/pages/_app';

import ListingReport from '@/components/pages/mobile/ListingReport';

const Page: NextPageWithLayout = () => <ListingReport />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
