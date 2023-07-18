import { Loading, MobileContainer } from '@/components/atoms';
import Routes from '@/router/routes';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// 네이티브 앱에서 푸시알림 클릭후 리디렉트 핸들링
const Page: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { data } = router.query;

    if (typeof data === 'string') {
      const url = data;
      router.replace(url);
    } else {
      router.replace(`/${Routes.EntryMobile}`);
    }
  }, [router]);

  return (
    <MobileContainer>
      <div tw="py-20">
        <Loading />
      </div>
    </MobileContainer>
  );
};

export default Page;
