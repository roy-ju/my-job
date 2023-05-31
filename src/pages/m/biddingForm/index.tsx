import { BiddingForm } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <BiddingForm />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
