import { NextPageWithLayout } from '@/pages/_app';

import RealestateDcoumentList from '@/components/pages/RealestateDocumentList/RealestateDcoumentListMobile';

const Page: NextPageWithLayout = () => <RealestateDcoumentList />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
