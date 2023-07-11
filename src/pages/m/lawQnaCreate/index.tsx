import { NextPageWithLayout } from '@/pages/_app';
import dynamic from 'next/dynamic';

const LawQnaDetail = dynamic(() => import('@/components/pages/mobile/LawQnaCreate'), { ssr: false });

const Page: NextPageWithLayout = () => <LawQnaDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
