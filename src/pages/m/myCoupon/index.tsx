import { NextPageWithLayout } from '@/pages/_app';

import CouponWrraper from '@/components/pages/mobile/My/CouponWrraper';

const Page: NextPageWithLayout = () => <CouponWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
