import { NextPageWithLayout } from '@/pages/_app';

import QnaWrraper from '@/components/pages/mobile/My/QnaWrraper';

const Page: NextPageWithLayout = () => <QnaWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
