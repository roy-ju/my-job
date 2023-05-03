import { UpdateBiddingSuccess } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <UpdateBiddingSuccess />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
