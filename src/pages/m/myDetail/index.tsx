import { NextPageWithLayout } from '@/pages/_app';

import DetailWrraper from '@/components/pages/mobile/My/DetailWrraper';

const Page: NextPageWithLayout = () => <DetailWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
