import dynamic from 'next/dynamic';

import { NextPageWithLayout } from '@/pages/_app';

const LawQnaUpdate = dynamic(() => import('@/components/pages/mobile/LawQnaUpdate'), { ssr: false });

const Page: NextPageWithLayout = () => <LawQnaUpdate />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
