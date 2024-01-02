import { NextPageWithLayout } from '@/pages/_app';

import My from '@/components/pages/mobile/My';

const Page: NextPageWithLayout = () => <My />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
