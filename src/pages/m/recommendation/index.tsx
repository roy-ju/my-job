import { NextPageWithLayout } from '@/pages/_app';

import Recommendation from '@/components/domains/landings/Recommendation';

const Page: NextPageWithLayout = () => <Recommendation />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
