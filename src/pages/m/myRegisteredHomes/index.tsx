import { NextPageWithLayout } from '@/pages/_app';

import MyRegisterdHomes from '@/components/pages/mobile/MyRegisterdHomes';

const Page: NextPageWithLayout = () => <MyRegisterdHomes />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
