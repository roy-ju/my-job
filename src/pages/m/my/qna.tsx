import useAPI_GetServiceQnaList from '@/apis/serviceqna/getServiceQnaList';
import MobQna from '@/components/templates/MobQna';
import { useAuth } from '@/hooks/services';
import { NextPageWithLayout } from '@/pages/_app';

function MobMyQnaWrraper() {
  const { user } = useAuth();
  const { list, mutate } = useAPI_GetServiceQnaList();

  return <MobQna mutateQna={mutate} loggedIn={user !== null} list={list} />;
}

const Page: NextPageWithLayout = () => <MobMyQnaWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      {page}
    </>
  );
};

export default Page;
