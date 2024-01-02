import dynamic from 'next/dynamic';

import { NextPageWithLayout } from '@/pages/_app';

const NoSSRVerifyCiSuccessWrraper = dynamic(() => import('@/components/pages/mobile/VerifyCiSuccess'), { ssr: false });

const Page: NextPageWithLayout = () => <NoSSRVerifyCiSuccessWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      {page}
    </>
  );
};

export default Page;
