import { NextPageWithLayout } from '@/pages/_app';

import UpdatePhoneMobile from '@/components/pages/UpdatePhone/UpdatePhoneMobile';

const Page: NextPageWithLayout = () => <UpdatePhoneMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
