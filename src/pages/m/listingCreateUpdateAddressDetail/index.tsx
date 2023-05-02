import { ListingCreateUpdateAddressDetail } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <ListingCreateUpdateAddressDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
