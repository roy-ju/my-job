import dynamic from 'next/dynamic';

import { NextPageWithLayout } from '@/pages/_app';

const LawQna = dynamic(() => import('@/components/pages/mobile/LawQna'), { ssr: false });

const Page: NextPageWithLayout = () => <LawQna />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
