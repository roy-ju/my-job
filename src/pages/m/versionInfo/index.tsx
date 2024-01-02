import { NextPageWithLayout } from '@/pages/_app';

import VersionInfo from '@/components/pages/mobile/VersionInfo';

const Page: NextPageWithLayout = () => <VersionInfo />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
