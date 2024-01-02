import { NextPageWithLayout } from '@/pages/_app';

import UpdateBiddingSummary from '@/components/pages/mobile/UpdateBiddingSummary';

const Page: NextPageWithLayout = () => <UpdateBiddingSummary />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
