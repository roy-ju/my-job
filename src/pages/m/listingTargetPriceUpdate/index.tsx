import { NextPageWithLayout } from '@/pages/_app';

import ListingTargetPriceUpdate from '@/components/pages/mobile/ListingTargetPriceUpdate';

const Page: NextPageWithLayout = () => <ListingTargetPriceUpdate />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
