import { NextPageWithLayout } from '@/pages/_app';

import TermsAndPolicy from '@/components/pages/TermsAndPolicy/TermsAndPolicyMobile';

const Page: NextPageWithLayout = () => <TermsAndPolicy />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
