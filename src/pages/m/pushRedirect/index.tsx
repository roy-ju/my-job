import { Loading, MobileContainer } from '@/components/atoms';
import Routes from '@/router/routes';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { data } = router.query;
    if (typeof data === 'string') {
      const parsed = JSON.parse(data as string);

      if (parsed.chat_room_id) {
        router.replace(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${parsed.chat_room_id}`);
        return;
      }

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
