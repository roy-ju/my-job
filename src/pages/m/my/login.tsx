import { NextPageWithLayout } from '@/pages/_app';
import dynamic from 'next/dynamic';

const NoSSRLoginWrraper = dynamic(() => import('@/components/pages/mobile/My/LoginWrraper'), { ssr: false });

const Page: NextPageWithLayout = () => <NoSSRLoginWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      {page}
    </>
  );
};

export default Page;
