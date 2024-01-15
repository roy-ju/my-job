import { NextPageWithLayout } from '@/pages/_app';

import SuccessWrraper from '@/components/pages/mobile/Register/SuccessWrraper';

const Page: NextPageWithLayout = () => <SuccessWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
