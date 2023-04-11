import useAPI_GetServiceQnaList from '@/apis/serviceqna/getServiceQnaList';
import { MobQna } from '@/components/templates';
import { useAuth } from '@/hooks/services';

export default function MobMyQnaWrraper() {
  const { user } = useAuth();
  const { list, mutate } = useAPI_GetServiceQnaList();

  return <MobQna mutateQna={mutate} loggedIn={user !== null} list={list} />;
}
