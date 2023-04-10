import { ServiceInfo } from '@/components/templates';
import { NextPageWithLayout } from '@/pages/_app';
import { MobileContainer } from '@/components/atoms';
import { MobGlobalHeader } from '@/components/organisms/MobGlobalHeader';

function ServiceInfoWrraper() {
  return <ServiceInfo />;
}

const Page: NextPageWithLayout = () => <ServiceInfoWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <MobileContainer>
      <MobGlobalHeader title="서비스 정보" />
      {page}
    </MobileContainer>
  );
};

export default Page;
