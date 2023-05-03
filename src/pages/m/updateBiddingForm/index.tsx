import { UpdateBiddingForm } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <UpdateBiddingForm />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
