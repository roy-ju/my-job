import { FAQ } from '@/components/templates';
import { NextPageWithLayout } from '@/pages/_app';
import { MobileContainer } from '@/components/atoms';
import { MobGlobalHeader } from '@/components/organisms/MobGlobalHeader';

function FaqWrraper() {
  return <FAQ />;
}

const Page: NextPageWithLayout = () => <FaqWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <MobileContainer>
      <MobGlobalHeader title="자주 묻는 질문" />
      {page}
    </MobileContainer>
  );
};

export default Page;
