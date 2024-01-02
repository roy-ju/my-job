import { NextPageWithLayout } from '@/pages/_app';

import ListingCreateSummary from '@/components/pages/mobile/ListingCreateSummary';

const Page: NextPageWithLayout = () => <ListingCreateSummary />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
