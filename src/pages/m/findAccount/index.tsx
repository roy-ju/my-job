import { NextPageWithLayout } from '@/pages/_app';

import FindAccountWrraper from '@/components/pages/mobile/My/FindAccountWrraper';

const Page: NextPageWithLayout = () => <FindAccountWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
