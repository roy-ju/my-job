import { NextPageWithLayout } from '@/pages/_app';

import QnaMobile from '@/components/pages/Qna/QnaMobile';

const Page: NextPageWithLayout = () => <QnaMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
