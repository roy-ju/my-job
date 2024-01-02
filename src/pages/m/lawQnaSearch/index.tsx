import dynamic from 'next/dynamic';

import { NextPageWithLayout } from '@/pages/_app';

const LawQnaSearch = dynamic(() => import('@/components/pages/mobile/LawQnaSearch'), { ssr: false });

const Page: NextPageWithLayout = () => <LawQnaSearch />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
