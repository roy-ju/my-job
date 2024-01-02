import { NextPageWithLayout } from '@/pages/_app';

import BiddingSummary from '@/components/pages/mobile/BiddingSummary';

const Page: NextPageWithLayout = () => <BiddingSummary />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
