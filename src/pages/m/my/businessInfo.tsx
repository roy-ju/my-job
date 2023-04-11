import { NextPageWithLayout } from '@/pages/_app';
import { MobileContainer } from '@/components/atoms';
import { BusinessInfoWrraper } from '@/components/pages/mobile';

const Page: NextPageWithLayout = () => <BusinessInfoWrraper />;

Page.getLayout = function getLayout(page) {
  return <MobileContainer>{page}</MobileContainer>;
};

export default Page;
