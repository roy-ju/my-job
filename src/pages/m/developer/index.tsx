import { DeveloperWrraper } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => {
  if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test') {
    return <DeveloperWrraper />;
  }
  return <div />;
};

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
