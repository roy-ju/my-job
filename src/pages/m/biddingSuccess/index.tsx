import { NextPageWithLayout } from '@/pages/_app';

import BiddingSuccess from '@/components/pages/mobile/BiddingSuccess';

const Page: NextPageWithLayout = () => <BiddingSuccess />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
