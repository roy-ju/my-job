import { NextPageWithLayout } from '@/pages/_app';

import UpdateBiddingForm from '@/components/pages/mobile/UpdateBiddingForm';

const Page: NextPageWithLayout = () => <UpdateBiddingForm />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
