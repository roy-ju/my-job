import { NextPageWithLayout } from '@/pages/_app';

import RegisterSuccessMobile from '@/components/pages/RegisterSuccess/RegisterSuccessMobile';

// import SuccessWrraper from '@/components/pages/mobile/Register/SuccessWrraper';

const Page: NextPageWithLayout = () => <RegisterSuccessMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
