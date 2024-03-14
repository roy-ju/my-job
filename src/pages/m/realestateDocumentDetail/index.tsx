import { NextPageWithLayout } from '@/pages/_app';

import RealestateDocumentDetail from '@/components/pages/RealestateDocumentDetail/RealestateDocumentDetailMobile';

const Page: NextPageWithLayout = () => <RealestateDocumentDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
