import { NextPageWithLayout } from '@/pages/_app';

import RealestateDocumentVerifyResult from '@/components/pages/RealestateDocumentVerifyResult/RealestateDocumentVerifyResultMobile';

const Page: NextPageWithLayout = () => <RealestateDocumentVerifyResult />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
