import { NextPageWithLayout } from '@/pages/_app';

import MyParticipatingListings from '@/components/pages/mobile/MyParticipatingListings';

const Page: NextPageWithLayout = () => <MyParticipatingListings />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
