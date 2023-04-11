import { NextPageWithLayout } from '@/pages/_app';
import { MobileContainer } from '@/components/atoms';
import { ServiceInfoWrraper } from '@/components/pages/mobile';

const Page: NextPageWithLayout = () => <ServiceInfoWrraper />;

Page.getLayout = function getLayout(page) {
  return <MobileContainer>{page}</MobileContainer>;
};

export default Page;
