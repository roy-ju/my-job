import { NextPageWithLayout } from '@/pages/_app';
import dynamic from 'next/dynamic';

const NoSSRRegisterWrraper = dynamic(() => import('@/components/pages/mobile/Register'), { ssr: false });

const Page: NextPageWithLayout = () => <NoSSRRegisterWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      {page}
    </>
  );
};

export default Page;
