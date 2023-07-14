import { NextPageWithLayout } from '@/pages/_app';
import dynamic from 'next/dynamic';

const LawQnaUpdate = dynamic(() => import('@/components/pages/mobile/LawQnaUpdate'), { ssr: false });

const Page: NextPageWithLayout = () => <LawQnaUpdate />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
