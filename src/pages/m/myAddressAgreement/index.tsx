import { NextPageWithLayout } from '@/pages/_app';

import MyAddressAgreement from '@/components/pages/MyAddressAgreement/MyAddressAgreementMobile';

const Page: NextPageWithLayout = () => <MyAddressAgreement />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
