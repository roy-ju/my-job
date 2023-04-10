import { NextPageWithLayout } from '@/pages/_app';
import { MobileContainer } from '@/components/atoms';
import MobFAQ from '@/components/templates/MobFAQ';

function FaqWrraper() {
  return <MobFAQ />;
}

const Page: NextPageWithLayout = () => <FaqWrraper />;

Page.getLayout = function getLayout(page) {
  return <MobileContainer>{page}</MobileContainer>;
};

export default Page;
