import { NextPageWithLayout } from '@/pages/_app';
import dynamic from 'next/dynamic';

const SuggestRequestedList = dynamic(() => import('@/components/pages/mobile/SuggestRequestedList'), { ssr: false });

const Page: NextPageWithLayout = () => <SuggestRequestedList />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
