import Intro from '@/components/landings/Intro';

import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <Intro />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
