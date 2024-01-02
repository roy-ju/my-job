import { NextPageWithLayout } from '@/pages/_app';

import NegoPointWrraper from '@/components/pages/mobile/My/NegoPointWrraper';

const Page: NextPageWithLayout = () => <NegoPointWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
