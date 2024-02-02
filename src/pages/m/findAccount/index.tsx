import { NextPageWithLayout } from '@/pages/_app';

import FindAccountMobile from '@/components/pages/FindAccount/FindAccountMobile';

// import FindAccountWrraper from '@/components/pages/mobile/My/FindAccountWrraper';

const Page: NextPageWithLayout = () => <FindAccountMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
