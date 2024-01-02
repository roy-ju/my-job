import { NextPageWithLayout } from '@/pages/_app';

import TransactionReview from '@/components/pages/mobile/TransactionReview';

const Page: NextPageWithLayout = () => <TransactionReview />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
