import { MobileContainer } from '@/components/atoms';
import My from '@/components/pages/mobile/My';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <My />;

Page.getLayout = function getLayout(page) {
  return <MobileContainer>{page}</MobileContainer>;
};

export default Page;
