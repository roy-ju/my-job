import { NextPageWithLayout } from '@/pages/_app';

import ListingTargetPriceUpdateSummary from '@/components/pages/mobile/ListingTargetPriceUpdateSummary';

const Page: NextPageWithLayout = () => <ListingTargetPriceUpdateSummary />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
