import { NextPageWithLayout } from '@/pages/_app';

import VerifyCi from '@/components/pages/mobile/VerifyCi';

const Page: NextPageWithLayout = () => <VerifyCi />;

Page.getLayout = function getLayout(page) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      {page}
    </>
  );
};

export default Page;
