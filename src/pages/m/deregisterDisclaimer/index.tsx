import { NextPageWithLayout } from '@/pages/_app';

import DeregisterDisclaimerMobile from '@/components/pages/DeregisterDisclaimer/DeregisterDisclaimerMobile';

// import DeregisterDisclaimerWrraper from '@/components/pages/mobile/My/DeregisterDisclaimerWrraper';

const Page: NextPageWithLayout = () => <DeregisterDisclaimerMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
