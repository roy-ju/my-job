import { NextPageWithLayout } from '@/pages/_app';

import CommonSense from '@/components/pages/CommonSense/CommonSenseMobile';

const Page: NextPageWithLayout = () => <CommonSense />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
