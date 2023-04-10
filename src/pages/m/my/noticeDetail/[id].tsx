import useAPI_GetNoticeDetail from '@/apis/notice/getNoticeDetail';
import { MobileContainer } from '@/components/atoms';
import Loading from '@/components/atoms/Loading';
import { MobGlobalHeader } from '@/components/organisms/MobGlobalHeader';
import { NoticeDetail } from '@/components/templates';
import { NextPageWithLayout } from '@/pages/_app';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useMemo, useCallback } from 'react';

function NoticeDetailWrraper() {
  const router = useRouter();

  const noticeID = useMemo(() => Number(router.query.id), [router.query]);

  const { data, isLoading } = useAPI_GetNoticeDetail(noticeID);

  const title = useMemo(() => {
    if (data) {
      if (data.category) {
        return `[${data.category}] ${data.title}`;
      }
      return data.title;
    }
    return '';
  }, [data]);

  const handleGoToList = useCallback(() => {
    router.replace(`/m/my/${Routes.NoticeList}`);
  }, [router]);

  return isLoading ? (
    <Loading tw="mt-10" />
  ) : (
    <>
      <MobGlobalHeader title={title} />
      <NoticeDetail
        title={title}
        createdTime={data?.createdTime ?? ''}
        descriptionHTML={data?.description ?? ''}
        onClickGoToList={handleGoToList}
      />
    </>
  );
}

const Page: NextPageWithLayout = () => <NoticeDetailWrraper />;

Page.getLayout = function getLayout(page) {
  return <MobileContainer>{page}</MobileContainer>;
};

export default Page;
