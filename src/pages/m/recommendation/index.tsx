import Recommendation from '@/components/templates/landings/Recommendation';

import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <Recommendation />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
