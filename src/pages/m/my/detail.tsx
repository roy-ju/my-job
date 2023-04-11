import DetailWrraper from '@/components/pages/mobile/My/DetailWrraper';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <DetailWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      {page}
    </>
  );
};

export default Page;
