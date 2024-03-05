import { NextPageWithLayout } from '@/pages/_app';

import Faq from '@/components/pages/Faq/FaqMobile';

const Page: NextPageWithLayout = () => <Faq />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
