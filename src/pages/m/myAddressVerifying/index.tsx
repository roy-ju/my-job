import { NextPageWithLayout } from '@/pages/_app';

import AddressVerifyingWrraper from '@/components/pages/mobile/My/AddressVerifyingWrraper';

const Page: NextPageWithLayout = () => <AddressVerifyingWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      {page}
    </>
  );
};

export default Page;
