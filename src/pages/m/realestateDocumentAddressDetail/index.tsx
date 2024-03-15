import { NextPageWithLayout } from '@/pages/_app';

import RealestateDocumentAddressDetail from '@/components/pages/RealestateDocumentAddressDetail/RealestateDocumentAddressDetailMobile';

const Page: NextPageWithLayout = () => <RealestateDocumentAddressDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
