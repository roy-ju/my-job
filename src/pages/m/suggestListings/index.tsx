import { SuggestListings } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <SuggestListings />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
