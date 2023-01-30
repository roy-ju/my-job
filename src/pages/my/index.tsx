import { Panel } from '@/components/atoms';
import { My } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { MapLayout } from '@/layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { useCallback } from 'react';

const MyPage: NextPageWithLayout = () => {
  const router = useRouter();

  const onClickGoBack = useCallback(() => {
    router.navigate('/');
  }, [router]);

  return (
    <Panel>
      <My onClickGoBack={onClickGoBack} />
    </Panel>
  );
};

MyPage.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export default MyPage;
