import { NextPageWithLayout } from '@/pages/_app';

import MyDetailMobile from '@/components/pages/MyDetail/MyDetailMobile';

const Page: NextPageWithLayout = () => <MyDetailMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
