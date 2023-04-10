import { NextPageWithLayout } from '@/pages/_app';
import { MobileContainer } from '@/components/atoms';
import MobBusinessInfo from '@/components/templates/MobBusinessInfo';

function BusinessInfoWrraper() {
  return <MobBusinessInfo />;
}

const Page: NextPageWithLayout = () => <BusinessInfoWrraper />;

Page.getLayout = function getLayout(page) {
  return <MobileContainer>{page}</MobileContainer>;
};

export default Page;
