import { NextPageWithLayout } from '@/pages/_app';

import RealestateDocumentAddressVerifying from '@/components/pages/RealestateDocumentAddressVerifying/RealestateDocumentAddressVerifyingMobile';

const Page: NextPageWithLayout = () => <RealestateDocumentAddressVerifying />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
