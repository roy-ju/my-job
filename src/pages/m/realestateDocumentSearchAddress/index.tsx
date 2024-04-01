import { NextPageWithLayout } from '@/pages/_app';

import RealestateDocumentSearchAddress from '@/components/pages/RealestateDocumentSearchAddress/RealestateDocumentSearchAddressMobile';

const Page: NextPageWithLayout = () => <RealestateDocumentSearchAddress />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
