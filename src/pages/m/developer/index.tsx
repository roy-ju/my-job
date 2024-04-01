import { NextPageWithLayout } from '@/pages/_app';

import Developer from '@/components/pages/Developer/DeveloperMobile';

const Page: NextPageWithLayout = () => {
  if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test') {
    return <Developer />;
  }

  return <div />;
};

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
