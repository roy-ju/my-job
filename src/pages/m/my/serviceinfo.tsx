import { NextPageWithLayout } from '@/pages/_app';
import { MobileContainer } from '@/components/atoms';

import MobServiceInfo from '@/components/templates/MobServiceInfo';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Routes from '@/router/routes';

function ServiceInfoWrraper() {
  const router = useRouter();

  const handleClickBusinessInfo = useCallback(() => {
    router.replace(`/m/my/${Routes.BusinessInfo}`);
  }, [router]);

  return <MobServiceInfo onClickBusinessInfo={handleClickBusinessInfo} />;
}

const Page: NextPageWithLayout = () => <ServiceInfoWrraper />;

Page.getLayout = function getLayout(page) {
  return <MobileContainer>{page}</MobileContainer>;
};

export default Page;
