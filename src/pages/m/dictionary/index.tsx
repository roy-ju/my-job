import { NextPageWithLayout } from '@/pages/_app';

import Dictionary from '@/components/pages/Dictionary/DictionaryMobile';

const Page: NextPageWithLayout = () => <Dictionary />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
