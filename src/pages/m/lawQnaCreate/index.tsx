import dynamic from 'next/dynamic';

import { NextPageWithLayout } from '@/pages/_app';

const LawQnaDetail = dynamic(() => import('@/components/pages/mobile/LawQnaCreate'), { ssr: false });

const Page: NextPageWithLayout = () => <LawQnaDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
