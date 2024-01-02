import { NextPageWithLayout } from '@/pages/_app';

import OpenSourceLicenses from '@/components/pages/mobile/OpenSourceLicenses';

const Page: NextPageWithLayout = () => <OpenSourceLicenses />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
