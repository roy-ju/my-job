import { NextPageWithLayout } from '@/pages/_app';

import DanjiSelect from '@/components/pages/mobile/DanjiSelect';

const Page: NextPageWithLayout = () => <DanjiSelect />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
