import { NextPageWithLayout } from '@/pages/_app';

import ListingDetailHistory from '@/components/pages/mobile/ListingDetailHistory';

const Page: NextPageWithLayout = () => <ListingDetailHistory />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
