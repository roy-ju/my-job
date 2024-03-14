import { NextPageWithLayout } from '@/pages/_app';

import RealestateDcoumentListMobile from '@/components/pages/RealestateDocumentList/RealestateDcoumentListMobile';

const Page: NextPageWithLayout = () => <RealestateDcoumentListMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
