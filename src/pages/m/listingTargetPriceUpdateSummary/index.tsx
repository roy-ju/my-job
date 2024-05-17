import { NextPageWithLayout } from '@/pages/_app';

import ListingTargetPriceUpdateSummary from '@/components/pages/ListingTargetPriceUpdateSummary/ListingTargetPriceUpdateSummaryMobile';

const Page: NextPageWithLayout = () => <ListingTargetPriceUpdateSummary />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
