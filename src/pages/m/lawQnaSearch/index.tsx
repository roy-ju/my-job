import { NextPageWithLayout } from '@/pages/_app';
import dynamic from 'next/dynamic';

const LawQnaSearch = dynamic(() => import('@/components/pages/mobile/LawQnaSearch'), { ssr: false });

const Page: NextPageWithLayout = () => <LawQnaSearch />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
