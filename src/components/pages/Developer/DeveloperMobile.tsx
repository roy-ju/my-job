import dynamic from 'next/dynamic';

import { NextPageWithLayout } from '@/pages/_app';

const Developer = dynamic(() => import('@/components/domains/developer'), { ssr: false });

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
