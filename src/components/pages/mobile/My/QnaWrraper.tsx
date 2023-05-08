import useAPI_GetServiceQnaList from '@/apis/serviceqna/getServiceQnaList';
import { MobileContainer } from '@/components/atoms';
import { Qna as QnaTemplate } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import { useRouter } from 'next/router';

export default function MobMyQnaWrraper() {
  const router = useRouter();
  const { user } = useAuth();
  const { list, mutate } = useAPI_GetServiceQnaList();

  return (
    <MobileContainer>
      <QnaTemplate mutateQna={mutate} loggedIn={user !== null} list={list} onClickBack={() => router.back()} />
    </MobileContainer>
  );
}
