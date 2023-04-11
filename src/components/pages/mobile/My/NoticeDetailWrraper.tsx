import useAPI_GetNoticeDetail from '@/apis/notice/getNoticeDetail';

import Loading from '@/components/atoms/Loading';
import { MobGlobalHeader } from '@/components/organisms';
import { NoticeDetail } from '@/components/templates';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useMemo, useCallback } from 'react';

export default function NoticeDetailWrraper() {
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
