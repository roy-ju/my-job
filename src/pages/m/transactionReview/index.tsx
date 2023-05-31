import { TransactionReview } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <TransactionReview />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
