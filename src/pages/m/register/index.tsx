import { NextPageWithLayout } from '@/pages/_app';

import Register from '@/components/pages/mobile/Register';

const Page: NextPageWithLayout = () => <Register />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
