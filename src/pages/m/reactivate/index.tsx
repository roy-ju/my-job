import { NextPageWithLayout } from '@/pages/_app';
import dynamic from 'next/dynamic';

const ReactivateWrapper = dynamic(() => import('@/components/pages/mobile/My/ReactivateWrapper'), { ssr: false });

const Page: NextPageWithLayout = () => <ReactivateWrapper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
