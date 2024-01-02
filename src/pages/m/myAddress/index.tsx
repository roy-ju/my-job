import { NextPageWithLayout } from '@/pages/_app';

import AddressWrraper from '@/components/pages/mobile/My/AddressWrraper';

const Page: NextPageWithLayout = () => <AddressWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      {page}
    </>
  );
};

export default Page;
