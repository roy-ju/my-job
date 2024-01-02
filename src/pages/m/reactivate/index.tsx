import dynamic from 'next/dynamic';

import { NextPageWithLayout } from '@/pages/_app';

const ReactivateWrapper = dynamic(() => import('@/components/pages/mobile/My/ReactivateWrapper'), { ssr: false });

const Page: NextPageWithLayout = () => <ReactivateWrapper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
