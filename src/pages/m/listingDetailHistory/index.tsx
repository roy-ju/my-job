import { ListingDetailHistory } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <ListingDetailHistory />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
