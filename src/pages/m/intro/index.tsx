import { Intro as IntroTemplate } from '@/components/templates/landings';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <IntroTemplate />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
