import { NextPageWithLayout } from '@/pages/_app';
import { MobileContainer } from '@/components/atoms';
import { MobGlobalHeader } from '@/components/organisms';

import { NoticeListWrraper } from '@/components/pages/mobile';

const Page: NextPageWithLayout = () => <NoticeListWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <MobileContainer>
      <MobGlobalHeader title="공지사항" />
      {page}
    </MobileContainer>
  );
};

export default Page;
