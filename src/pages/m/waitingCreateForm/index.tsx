import { NextPageWithLayout } from '@/pages/_app';

import WaitingCreateFormMobile from '@/components/pages/WaitingCreateForm/WaitingCreateFormMobile';

const Page: NextPageWithLayout = () => <WaitingCreateFormMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
