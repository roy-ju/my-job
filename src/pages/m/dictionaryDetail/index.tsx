import { NextPageWithLayout } from '@/pages/_app';

import DictionaryDetail from '@/components/pages/DictionaryDetail/DictionaryDetailMobile';

const Page: NextPageWithLayout = () => <DictionaryDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
