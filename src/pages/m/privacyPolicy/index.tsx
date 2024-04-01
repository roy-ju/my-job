import { NextPageWithLayout } from '@/pages/_app';

import PrivacyPolicy from '@/components/pages/PrivacyPolicy/PrivacyPolicyMobile';

const Page: NextPageWithLayout = () => <PrivacyPolicy />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
