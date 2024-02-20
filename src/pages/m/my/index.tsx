import { NextPageWithLayout } from '@/pages/_app';

import MyMobile from '@/components/pages/My/MyMobile';

const Page: NextPageWithLayout = () => <MyMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
