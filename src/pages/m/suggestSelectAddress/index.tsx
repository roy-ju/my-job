import { NextPageWithLayout } from '@/pages/_app';

import SuggestSelectAddress from '@/components/pages/mobile/SuggestSelectAddress';

const Page: NextPageWithLayout = () => <SuggestSelectAddress />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
