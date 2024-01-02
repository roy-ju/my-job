import { NextPageWithLayout } from '@/pages/_app';

import BiddingForm from '@/components/pages/mobile/BiddingForm';

const Page: NextPageWithLayout = () => <BiddingForm />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
