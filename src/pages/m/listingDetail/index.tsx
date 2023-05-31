import { NextPageWithLayout } from '@/pages/_app';
import dynamic from 'next/dynamic';

const ListingDetail = dynamic(() => import('@/components/pages/mobile/ListingDetail'), { ssr: false });

const Page: NextPageWithLayout = () => <ListingDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
