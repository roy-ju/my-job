import RegisterMobile from '@/components/pages/Register/RegisterMobile';

import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <RegisterMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
