import { Loading, MobileContainer } from '@/components/atoms';
// import Routes from '@/router/routes';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// 네이티브 앱에서 푸시알림 클릭후 리디렉트 핸들링
const Page: NextPage = () => {
  const router = useRouter();

  const [text, setText] = useState('');

  useEffect(() => {
    const { data } = router.query;
    if (typeof data === 'string') {
      const parsed = JSON.parse(data as string);

      if (parsed?.url && typeof parsed.url === 'string') {
        setText(parsed?.url || '');
      }
    }

    // else {
    //   router.replace(`/${Routes.EntryMobile}`);
    // }
  }, [router]);

  return (
    <MobileContainer>
      <div tw="py-20">
        <Loading />
        <p>{text}</p>
      </div>
    </MobileContainer>
  );
};

export default Page;
