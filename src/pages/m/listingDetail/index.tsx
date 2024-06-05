import dynamic from 'next/dynamic';

import { NextPageWithLayout } from '@/pages/_app';

const ListingDetail = dynamic(() => import('@/components/pages/ListingDetail/ListingDetailMobile'), { ssr: false });

const Page: NextPageWithLayout = () => <ListingDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
