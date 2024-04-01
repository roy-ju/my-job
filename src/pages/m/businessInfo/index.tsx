import { NextPageWithLayout } from '@/pages/_app';

import BusinessInfo from '@/components/pages/BusinessInfo/BusinessInfoMobile';

const Page: NextPageWithLayout = () => <BusinessInfo />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
