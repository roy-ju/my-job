import { NextPageWithLayout } from '@/pages/_app';

import UpdateBiddingSuccess from '@/components/pages/mobile/UpdateBiddingSuccess';

const Page: NextPageWithLayout = () => <UpdateBiddingSuccess />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
